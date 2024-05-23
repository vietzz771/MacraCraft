import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import ShowOrders from './show';
// Just add this feature if you want :P

const UserOrdersTab = () => {
  const [product, setProduct] = useState([]);
  const [priceProduct, setPrice] = useState([]);
  const [orders, setOrder] = useState([]);
  const { profile, isAuthenticating, userId } = useSelector((state) => ({
    profile: state.profile,
    isAuthenticating: state.app.isAuthenticating,
    userId: state.auth.id
  }));
  const state = useSelector((state) => state)
  const userOrders = () => {
    const orderFlag = [];
    firebase.firestore().collection('orders')
      .where("userId", "==", userId)
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
  return (
    (!orders.length) ? (<div className="loader" style={{ minHeight: '80vh' }}>
      <h3>My Orders</h3>
      <strong><span className="text-subtle">You don&apos;t have any orders</span></strong>
    </div>) : (<div className='loader-order'>
      <h3 className='text-center'>My Orders</h3>
      {orders.map(order => <ShowOrders order={order} key={order.orderId} />)}
    </div>)
  )
};

export default UserOrdersTab;
