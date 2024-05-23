import {
  RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS,
  SET_CHECKOUT_SHIPPING_DETAILS, SET_CHECKOUT_BASKET_DETAILS,
  SET_CHECKOUT_SUBTOTAL_DETAILS,
  SET_CHECKOUT_USERID_DETAILS, SET_CHECKOUT_STATUS_DETAILS
} from '@/constants/constants';

const defaultState =
  {
    subTotal: '',
    basket: {},
    shipping: {},
    payment: {
      type: 'paypal',
      name: '',
      cardnumber: '',
      expiry: '',
      ccv: ''
    },
    userId: '',
    status: ''
  };

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload
      };
    case SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        payment: action.payload
      };
    case SET_CHECKOUT_BASKET_DETAILS:
      return {
        ...state,
        basket: action.payload
      };
    case SET_CHECKOUT_SUBTOTAL_DETAILS:
      return {
        ...state,
        subTotal: action.payload
      };
    case SET_CHECKOUT_USERID_DETAILS:
      return {
        ...state,
        userId: action.payload
      };
    case SET_CHECKOUT_STATUS_DETAILS:
      return {
        ...state,
        status: action.payload
      };
    case RESET_CHECKOUT:
      return defaultState;
    default:
      return state;
  }
};
