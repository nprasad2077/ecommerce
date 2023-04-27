// Import the required packages
import axios from "axios";
import {
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

// Define an asynchronous action creator for adding an item to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
    // Fetch product data from the API using axios
    const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)

    // Dispatch the action to the reducer with the type and payload
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // Save the updated cart items to the local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Define an action creator for removing an item from the cart
export const removeFromCart = (id) => (dispatch, getState) => {
    // Dispatch the action to the reducer with the type and payload
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    // Save the updated cart items to the local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Define an action creator for saving the shipping address
export const saveShippingAddress = (data) => (dispatch) => {
    // Dispatch the action to the reducer with the type and payload
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    // Save the shipping address to the local storage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

// Define an action creator for saving the payment method
export const savePaymentMethod = (data) => (dispatch) => {
    // Dispatch the action to the reducer with the type and payload
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    // Save the payment method to the local storage
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
