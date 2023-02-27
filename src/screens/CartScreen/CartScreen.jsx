import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart} from '../../actions/cartActions'
import { useParams } from 'react-router-dom'
import Message from '../../components/Message/Message'



const CartScreen = ({match, history}) => {
  const {id} = useParams()
  const location = useLocation()
  const productID = id
  const qty = location.search

  console.log(qty);


  return (
    <div>Cart</div>
  )
}

export default CartScreen