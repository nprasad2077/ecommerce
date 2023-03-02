import React, {useState, useEffect} from 'react'
import { Button, FormGroup, FormLabel, FormControl, Row, Col, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Message from '../../components/Message/Message'


const PlaceorderScreen = () => {
    const cart = useSelector(state => state.cart)


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},
                            {'  '}
                            {cart.shippingAddress.postalCode}, 
                            {'  '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroupItem>
                </ListGroup>
            </Col>

            <Col md={4}>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceorderScreen