import {
  RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS,
  SET_CHECKOUT_SHIPPING_DETAILS, SET_CHECKOUT_BASKET_DETAILS,
  SET_CHECKOUT_SUBTOTAL_DETAILS, ADD_ORDER,
  SET_CHECKOUT_USERID_DETAILS, SET_CHECKOUT_STATUS_DETAILS,
  CANCEL_ORDER
} from '@/constants/constants';

export const setShippingDetails = (details) => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details
});

export const setPaymentDetails = (details) => ({
  type: SET_CHECKOUT_PAYMENT_DETAILS,
  payload: details
});

export const setBasketDetails = (details) => ({
  type: SET_CHECKOUT_BASKET_DETAILS,
  payload: details
});

export const setSubTotalDetails = (details) => ({
  type: SET_CHECKOUT_SUBTOTAL_DETAILS,
  payload: details
});

export const setUserIdDetails = (details) => ({
  type: SET_CHECKOUT_USERID_DETAILS,
  payload: details
});

export const setStatusDetails = (details) => ({
  type: SET_CHECKOUT_STATUS_DETAILS,
  payload: details
});

export const addOrder = (details) => ({
  type: ADD_ORDER,
  payload: details
});

export const cancelOrder = (details) => ({
  type: CANCEL_ORDER,
  payload: details
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT
});
