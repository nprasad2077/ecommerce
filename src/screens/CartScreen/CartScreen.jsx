import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart} from '../../actions/cartActions'
import { useParams } from 'react-router-dom'
import Message from '../../components/Message/Message'



const CartScreen = ({history}) => {
  const {id} = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const productId = id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log(cartItems);

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }

  }, [dispatch, productId, qty])


  return (
    <div>Cart</div>
  )
}

export default CartScreen