/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from '@/selectors/selector';
import { OrdersNavbar } from '../components';
import OrdersTable from '../components/OrdersTable';
import firebase from 'firebase';

const Orders = () => {
  useDocumentTitle('Order List | MacraCraft Admin');
  useScrollTop();
  const [orders, setOrders] = useState([]);
  const getAllUser = () => {
    const orderFlag = [];
    firebase.firestore().collection('orders')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          orderFlag.push(doc.data());
          console.log(orderFlag);
        });
        setOrders(orderFlag);
      })
      .catch(function (err) {
        console.error("Error getting document:", err)
      })
  }

  useEffect(() => {
    getAllUser()
  }, []);

  return (
    <Boundary>
      <OrdersNavbar ordersCount={orders.length} />
      <div className="product-admin-items">

        <OrdersTable orders={orders} />
      </div>
    </Boundary>
  );
};

export default withRouter(Orders);
