import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from '@/components/common';
import { ADD_PRODUCT } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const OrdersNavbar = (props) => {
  const { ordersCount } = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Orders &nbsp;
        (
        {`${ordersCount} / ${ordersCount}`}
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
        &nbsp; Add New Order
      </button>
    </div>
  );
};

// OrdersNavbar.propTypes = {
//   usersCount: PropType.number.isRequired
// };

export default OrdersNavbar;
