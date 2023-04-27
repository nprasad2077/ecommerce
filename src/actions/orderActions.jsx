import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_CREATE_RESET,
} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST, // Dispatching an action to set the loading state while creating the order
    });

    const {
      userLogin: { userInfo }, // Extracting user info from the state
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Adding the token to the headers to authenticate the request
      },
    };

    // Sending a POST request to the backend API to create a new order
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/orders/add/`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS, // Dispatching an action with the order data if the request is successful
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS, // Dispatching an action to clear the cart items from the state
      payload: data,
    });

    localStorage.removeItem("cartItems"); // Removing the cart items from the local storage
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL, // Dispatching an action with the error message if the request fails
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// This function fetches the details of a specific order by making a GET request to the backend API
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    // Dispatches an action indicating that the request is being made
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // Gets the user information from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // Sets up the configuration for the request, including the content type and authorization token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Makes the GET request to the backend API to retrieve the order details for the specified order ID
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/orders/${id}/`,
      config
    );

    // Dispatches an action indicating that the order details were successfully retrieved, along with the payload (order data)
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If there is an error while fetching the order details, dispatches an action indicating the error and including the error message in the payload
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST, // Dispatches the action to set loading state
    });

    const {
      userLogin: { userInfo }, // Gets the logged-in user info from the state
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Adds the token to the headers for authentication
      },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/orders/${id}/pay/`, // Makes a PUT request to update the order payment details
      paymentResult, // Sends the payment details in the request body
      config // Includes the token in the request headers for authentication
    );

    dispatch({
      type: ORDER_PAY_SUCCESS, // Dispatches the action to update the state with the payment result
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL, // Dispatches the action to update the state with the error message
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST, // Dispatch the order deliver request action
    });

    const {
      userLogin: { userInfo }, // Get the user info from the state
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Set the authorization header with the user token
      },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/orders/${order._id}/deliver/`,
      {}, // Send an empty object as the request body
      config // Include the authorization header in the request
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS, // Dispatch the order deliver success action
      payload: data, // Pass the updated order data as the payload
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL, // Dispatch the order deliver fail action
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message, // Pass the error message as the payload
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST, // set the order list request
    });

    const {
      userLogin: { userInfo }, // get the user info from the state
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // set the authorization header
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/orders/myorders/`, // make a GET request to fetch the user's orders
      config
    );

    dispatch({
      type: ORDER_LIST_MY_SUCCESS, // set the order list success
      payload: data, // set the payload to the fetched data
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL, // set the order list failure
      payload:
        error.response && error.response.data.detail // set the payload to the error message if available
          ? error.response.data.detail
          : error.message,
    });
  }
};

// This function retrieves a list of all orders from the backend
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST, // Dispatching an action to update the state that the request has been initiated
    });

    const {
      userLogin: { userInfo }, // Extracting user info from the state
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json", // Setting the content type of the request
        Authorization: `Bearer ${userInfo.token}`, // Adding the JWT token to the header for authentication
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/orders/`, // Making a GET request to the backend to retrieve orders data
      config // Including the headers and other configurations in the request
    );

    dispatch({
      type: ORDER_LIST_SUCCESS, // Dispatching an action to update the state with the retrieved orders data
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL, // Dispatching an action to update the state that the request has failed
      payload:
        error.response && error.response.data.detail // Adding the error message to the payload for display
          ? error.response.data.detail
          : error.message,
    });
  }
};
