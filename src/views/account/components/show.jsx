import react from 'react';
import { displayMoney } from '@/helpers/utils';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from '@/components/common';
import { useModal } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder } from '@/redux/actions/checkoutActions';
const ShowOrders = ({ order }) => {
  const { orderId, orderDate, subtotal, status, basket, shipping } = order;
  const modal = useModal();
  const dispatch = useDispatch();
  const updateStatus = "cancelled";
  const orderUpdate = { orderId: orderId, updateStatus: updateStatus }
  return (
    <div className='margin-order' style={{ backgroundColor: "white", padding: "20px" }}>
      <div className='order-header'>
        <div className='order-border'>
          <div className="order-id">
            <h3>Order</h3>
            <h3 className="text-id">#{orderId}</h3>
          </div>
        </div>
        <div className='order-date'>Order Placed: {orderDate}</div>
        <div className='order-address'>Address: {shipping.address}</div>
      </div>
      {basket.map(product =>
      (
        <div className='order-body' key={product.name}>
          <div className='order-line'></div>
          <div className='order-content'>
            <div className='order-image'>
              <img alt={product.name}
                className="item-img"
                src={product.image}
                key={product.name} />
            </div>
            <div className='order-details'>
              <div className='order-name'>{product.name}</div>
              <div className='order-case'>
                <span>{`Size: ${product.selectedSize ? product.selectedSize : product.sizes[0]}`}</span>
                <span>Qty: {product.quantity}</span>
                <span className='order-color-flex'>Color: <div className='order-color' style={{ backgroundColor: product.selectedColor ? product.selectedColor : product.availableColors[0] }}></div></span>
              </div>
            </div>
            <div className='order-product-price'>
              <div>Subtotal</div>
              <div style={{ marginTop: "20px" }}>{displayMoney(product.price * product.quantity)}</div>
            </div>
            <div className='order-status'>
              <div>Status</div>
              <div style={{ marginTop: "20px" }} className='text-cas'><span className={`text-cas ${status === 'pending' ? 'pending' : status === 'shipping' ? 'shipping' : status === 'completed' ? 'completed' : status === 'cancelled' ? 'cancelled' : ''}`}>{status}</span></div>
            </div>
          </div>
        </div>
      )
      )}
      <div className="order-footer">
        <div className="order-line"></div>
        <div className="order-footer-content">
          <div>
            <button
              className="button button-border button-small"
              type="button"
              onClick={() => { modal.onOpenModal(); }}
            >
              X CANCEL ORDER
            </button>
          </div>
          <div style={{ color: 'rgb(121, 121, 121)' }}>Ship: {displayMoney(30000)}</div>
          <div>Total: {displayMoney(subtotal)}</div>
        </div>
      </div>
      <Modal
        isOpen={modal.isOpenModal}
        onRequestClose={modal.onCloseModal}
      >
        <div className="text-center padding-l">
          <h4>Confirm Cancel Order</h4>
          <p>
            To continue canceling your order &nbsp;
            <strong className="text-id">#{orderId}</strong>
            ,
            <br />
            please confirm by click Confirm button
          </p>
        </div>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-danger"
            onClick={() => {
              dispatch(cancelOrder(orderUpdate));
              modal.onCloseModal();
            }}
            type="button"
          >
            <CheckOutlined />
            &nbsp;
            Confirm
          </button>
        </div>
        <button
          className="modal-close-button button button-border button-border-gray button-small"
          onClick={modal.onCloseModal}
          type="button"
        >
          <CloseOutlined />
        </button>
      </Modal>
    </div>
  )
}

export default ShowOrders;