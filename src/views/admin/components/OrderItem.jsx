import { ImageLoader } from '@/components/common';
import { EDIT_PRODUCT } from '@/constants/routes';
import { displayActionMessage, displayDate, displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React, { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { removeProduct } from '@/redux/actions/productActions';

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <SkeletonTheme
      color="#e1e1e1"
      highlightColor="#f2f2f2"
    >
      <div
        className={`item item-products ${!order.orderId && 'item-loading'}`} style={{ padding: "10px 0" }}
      >
        <div className="grid grid-count-6">
          <div className="grid-col">
            <span className='text-id'>#{order.orderId || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{order.shipping.email || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{order.orderDate}</span>
          </div>
          <div className="grid-col">
            <span>
              {displayMoney(order.subtotal) || <Skeleton width={30} />}
            </span>
          </div>
          <div className="grid-col">
            <span className={`text-cas ${order.status === 'pending' ? 'pending' : order.status === 'shipping' ? 'shipping' : order.status === 'completed' ? 'completed' : order.status === 'cancelled' ? 'cancelled' : ''}`}>{order.status || <Skeleton width={20} />}</span>
          </div>
          <div className="grid-col">
            <button
              className="button button-border button-small"
              type="button"
              onClick={() => { modal.onOpenModal(); }}
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

// ProductItem.propTypes = {
//   product: PropType.shape({
//     id: PropType.string,
//     name: PropType.string,
//     brand: PropType.string,
//     price: PropType.number,
//     maxQuantity: PropType.number,
//     description: PropType.string,
//     keywords: PropType.arrayOf(PropType.string),
//     imageCollection: PropType.arrayOf(PropType.object),
//     sizes: PropType.arrayOf(PropType.string),
//     image: PropType.string,
//     imageUrl: PropType.string,
//     isFeatured: PropType.bool,
//     isRecommended: PropType.bool,
//     dateAdded: PropType.number,
//     availableColors: PropType.arrayOf(PropType.string)
//   }).isRequired
// };

export default withRouter(OrderItem);
