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

                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>
                            Your cart is empty
                        </Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>

                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Item: </Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Button>
                                Place Order
                            </Button>
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceorderScreen