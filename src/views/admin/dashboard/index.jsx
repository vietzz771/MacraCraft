import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import firebase from 'firebase';
import { displayMoney } from '@/helpers/utils';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`QTY: ${payload.name == "Totes" ? value / 300000 : value / 50000} - ${payload.name == "Totes" ? displayMoney(value) : displayMoney(value)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const Dashboard = () => {
  useDocumentTitle('Welcome | Admin Dashboard');
  useScrollTop();
  const [orders, setOrder] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totes, setTotes] = useState(0);
  const [bottleHolder, setBottleHolder] = useState(0);
  const [allItem, setAllItem] = useState(0);
  const [totalTodays, setTotalTodays] = useState(0);
  const [subtotalTodays, setSubtotalTodays] = useState(0);
  const [totalOrdersTodays, setTotalOrdersTodays] = useState(0);
  const totalOrders = orders.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const data = [
    {
      name: 'April',
      totes: 0,
      bottleHolder: 0
    },
    {
      name: 'May',
      totes: totes,
      bottleHolder: bottleHolder,
    },
  ];
  const data2 = [
    { name: 'Totes', value: totes * 300000 },
    { name: 'Bottle Holder', value: bottleHolder * 50000 },
  ];
  const userOrders = () => {
    const orderFlag = [];
    firebase.firestore().collection('orders')
      .where("status", "!=", "cancelled")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          orderFlag.push(doc.data());
          console.log(orders);
        });
        setOrder(orderFlag);
      })
      .catch(function (err) {
        console.error("Error getting document:", err)
      })
  }
  useEffect(() => {
    userOrders()
  }, []);
  console.log(orders);
  useEffect(() => {
    const calculateTotals = () => {
      let subtotal = 0;
      let totalTotes = 0;
      let totalBottleHolder = 0;
      let totalTodays = 0;
      let subtotalTodays = 0;
      let totalOrdersTodays = 0;
      orders.forEach(order => {
        // Assuming each order has a `total` field for its subtotal
        if (order.subtotal) {
          subtotal += order.subtotal;
        }
        // Assuming each order has a `totes` field for the number of totes
        if (order.orderDate == today) {
          totalTodays += order.basket.reduce((acc, item) => {
            return acc + parseInt(item.quantity, 10);
          }, 0);
          subtotalTodays += order.subtotal;
          totalOrdersTodays += 1;
        }
        if (order.basket) {
          order.basket.forEach(item => {
            if (item.name == "Totes") {
              totalTotes += parseInt(item.quantity, 10);
            } else if (item.name == "Bottle Holder") {
              totalBottleHolder += parseInt(item.quantity, 10);
            }
          })
        }
      });
      setTotalOrdersTodays(totalOrdersTodays);
      setSubtotalTodays(subtotalTodays);
      setTotalTodays(totalTodays);
      setSubtotal(subtotal);
      setTotes(totalTotes);
      setBottleHolder(totalBottleHolder);
      setAllItem(totalTotes + totalBottleHolder);
    };
    calculateTotals();
  }, [orders]);
  return (
    <div className="dashboard">
      <div className='dashboard-header'>
        <div className='all-sales'>
          <h3>Total Sales</h3>
          <strong>{displayMoney(subtotal)}</strong>
          <p>We have sold <strong>{allItem}</strong> items</p>
        </div>
        <div className='todays-sales'>
          <h3>Todays Sales</h3>
          <strong>{displayMoney(subtotalTodays)}</strong>
          <p>We have sold <strong>{totalTodays}</strong> items</p>
        </div>
        <div className='all-order'>
          <h3>Total Order</h3>
          <p>We have <strong>{totalOrders}</strong> ordered</p>
        </div>
        <div className='todays-order'>
          <h3>Todays Order</h3>
          <p>We have <strong>{totalOrdersTodays}</strong> ordered</p>
        </div>
      </div>
      <div className='dashboard-body'>
        <div className='dashboard-body-content'>
          <div className='chart'>
            <div className='dashboard-body-title'><h2>Total product</h2></div>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totes" stackId="a" fill="#8884d8" name="Totes" />
                <Bar dataKey="bottleHolder" stackId="a" fill="#82ca9d" name="Bottle Holder" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='chart-cir'>
            <div className='dashboard-body-title'><h2>Total revenue</h2></div>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={400} height={400}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data2}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
