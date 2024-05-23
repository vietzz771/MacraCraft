/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from '@/selectors/selector';
import { UsersNavbar } from '../components';
import UsersTable from '../components/UsersTable';
import firebase from 'firebase';

const Users = () => {
  useDocumentTitle('User List | MacraCraft Admin');
  useScrollTop();

  const [users, setUsers] = useState([]);
  const getAllUser = () => {
    const userFlag = [];
    firebase.firestore().collection('users')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          userFlag.push(doc.data());
          console.log(userFlag);
        });
        setUsers(userFlag);
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
      <UsersNavbar
        usersCount={users.length}
      />
      <div className="product-admin-items">
        {/* <ProductList {...store}>
          <AppliedFilters filter={store.filter} />
          <ProductsTable filteredProducts={store.filteredProducts} />
        </ProductList> */}
        <UsersTable users={users} />
      </div>
    </Boundary>
  );
};

export default withRouter(Users);
