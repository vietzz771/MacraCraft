import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { useFormikContext } from 'formik';
import { displayMoney } from '@/helpers/utils';
import { displayActionMessage } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPaymentDetails, setBasketDetails, setSubTotalDetails, addOrder, setUserIdDetails, setStatusDetails } from '@/redux/actions/checkoutActions';
import { clearBasket } from '@/redux/actions/basketActions';
import { v4 as uuidv4 } from 'uuid';
const Total = ({ isInternational, subtotal, basket, shipping, payment, userId, status }) => {
  subtotal = Number(subtotal + 30000)
  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const getFirst8CharsOfUuid = () => {
    const uuid = uuidv4();
    return uuid.substring(0, 8);
  };
  const orderId = getFirst8CharsOfUuid();

  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    const { cardnumber, ccv, ...rest } = values;
    dispatch(setPaymentDetails({ ...rest })); // save payment details
    dispatch(setBasketDetails(basket));
    dispatch(setSubTotalDetails(subtotal));
    history.push(CHECKOUT_STEP_2);
  };

  const handleSubmit = () => {
    const { cardnumber, ccv, ...rest } = values;
    dispatch(setPaymentDetails({ ...rest })); // save payment details
    dispatch(setBasketDetails(basket));
    dispatch(setSubTotalDetails(subtotal));
    dispatch(setStatusDetails(status));
    const order = { orderDate, orderId, basket, subtotal, shipping, payment, userId, status }
    dispatch(addOrder(order));
    submitForm();
    displayActionMessage('Order placed successfully <3', 'success');
    console.log(order);
    setTimeout(() => {
      dispatch(clearBasket());
      history.push('/');
    }, 2000);
  }

  return (
    <>
      <div className="basket-total text-right">
        <p className="basket-total-title">Total:</p>
        <h2 className="basket-total-amount">
          {displayMoney(subtotal)}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button button-muted"
          onClick={() => onClickBack(values)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Go Back
        </button>
        <button
          className="button"
          disabled={false}
          onClick={handleSubmit}
          type="button"
        >
          <CheckOutlined />
          &nbsp;
          Confirm
        </button>
      </div>
    </>
  );
};

Total.propTypes = {
  isInternational: PropType.bool.isRequired,
  subtotal: PropType.number.isRequired
};

export default Total;
