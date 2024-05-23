/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { UserItem } from '.';

const UsersTable = ({ users }) => (
  <div>
    {users.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col">
          <h5>Email</h5>
        </div>
        <div className="grid-col">
          <h5>Full Name</h5>
        </div>
        <div className="grid-col">
          <h5>Phone Number</h5>
        </div>
        <div className="grid-col">
          <h5>Date Join</h5>
        </div>
        <div className="grid-col">
          <h5>Role</h5>
        </div>
        <div className="grid-col" />
      </div>
    )}
    {users && users.map(user => <UserItem key={user.email} user={user} />)}
  </div>
);



export default UsersTable;
