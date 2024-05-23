import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from '@/components/common';
import { ADD_PRODUCT } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const UsersNavbar = (props) => {
  const { usersCount } = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Users &nbsp;
        (
        {`${usersCount} / ${usersCount}`}
        )
      </h3>
      {/* <SearchBar /> */}
      &nbsp;
      <FiltersToggle>
        <button className="button-muted button-small" type="button">
          <FilterOutlined />
          &nbsp;More Filters
        </button>
      </FiltersToggle>
      <button
        className="button button-small"
        onClick={() => history.push(ADD_PRODUCT)}
        type="button"
      >
        <PlusOutlined />
        &nbsp; Add New User
      </button>
    </div>
  );
};

UsersNavbar.propTypes = {
  usersCount: PropType.number.isRequired
};

export default UsersNavbar;
