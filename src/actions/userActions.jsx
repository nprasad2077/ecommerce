import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

// Login user action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Make a POST request to login endpoint and send email and password in the request body
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/login/",
      { username: email, password: password },
      config
    );

    // Dispatch action to indicate successful login and set user data in state
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save user info in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // If login fails, dispatch an error message with the details
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Logout user action
export const logout = () => (dispatch) => {
  // Remove user info from local storage
  localStorage.removeItem("userInfo");

  // Dispatch actions to reset user and order state
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

// Register user action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Make a POST request to register endpoint and send name, email and password in the request body
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/register/",
      { name: name, email: email, password: password },
      config
    );

    // Dispatch actions to indicate successful registration, set user data in state and log in the user
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save user info in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // If registration fails, dispatch an error message with the details
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Get user details action
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make a GET request to get the user details with the provided ID
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/users/${id}/`,
      config
    );

    // Dispatch action to set user details in state
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If there is an error, dispatch an error message with the details
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Update user profile action
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make a PUT request to update the user profile
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/users/profile/update/`,
      user,
      config
    );

    // Dispatch actions to update user profile and set user data in state
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save updated user info in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // If there is an error, dispatch an error message with the details
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// List all users action
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make a GET request to list all users
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/users/`,
      config
    );

    // Dispatch action to set user list in state
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If there is an error, dispatch an error message with the details
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Delete user action
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make a DELETE request to delete the user with the provided ID
    const { data } = await axios.delete(
      `http://127.0.0.1:8000/api/users/delete/${id}`,
      config
    );

    // Dispatch action to indicate user deletion was successful
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If there is an error, dispatch an error message with the details
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Update user action
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make a PUT request to update the user with the provided ID and data
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/users/update/${user._id}/`,
      user,
      config
    );

    // Dispatch actions to indicate user update was successful and set updated user data in state
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If there is an error, dispatch an error message with the details
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
