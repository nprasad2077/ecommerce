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

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }

  }, [dispatch, productId, qty])


  return (
    <Row>

      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ): (
          <ListGroup variant='flush'>

          </ListGroup>
        )}
      </Col>

      <Col md={4}>
      </Col>

    </Row>
  )
}

export default CartScreen