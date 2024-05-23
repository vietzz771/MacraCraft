/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { OrderItem } from '.';

const OrdersTable = ({ orders }) => (
  <div>
    {orders.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col">
          <h5>Order ID</h5>
        </div>
        <div className="grid-col">
          <h5>User</h5>
        </div>
        <div className="grid-col">
          <h5>Order Date</h5>
        </div>
        <div className="grid-col">
          <h5>Total</h5>
        </div>
        <div className="grid-col">
          <h5>Status</h5>
        </div>
        <div className="grid-col" />
      </div>
    )}
    {orders && orders.map(order => <OrderItem key={order.orderId} order={order} />)}
  </div>
);



export default OrdersTable;
