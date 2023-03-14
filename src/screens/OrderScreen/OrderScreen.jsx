import React, {useState, useEffect} from 'react'
import { Button, FormGroup, FormLabel, FormControl, Row, Col, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { getOrderDetails, payOrder } from '../../actions/orderActions'
import { ORDER_PAY_RESET } from '../../constants/orderConstants'


const OrderScreen = () => {

    const {orderId} = useParams()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    if (!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    // AVffVSsk5xRljctxIjDhuu4bCNpXRL7NIOswpMhyPB5yObjU24Z8oFcUDPVb-ae1fXvMDiJFxYgvx4zY

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVffVSsk5xRljctxIjDhuu4bCNpXRL7NIOswpMhyPB5yObjU24Z8oFcUDPVb-ae1fXvMDiJFxYgvx4zY'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)

    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!order || successPay || order._id !== Number(orderId)){
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            } else {
                sdkReady(true)
            }
        }
        
    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))

    }


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city},
                            {'  '}
                            {order.shippingAddress.postalCode}, 
                            {'  '}
                            {order.shippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}

                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>
                            Order is empty
                        </Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                <Col>Items: </Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Total Price:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        {!order.isPaid && (
                            <ListGroupItem>
                                {loadingPay && <Loader />}

                                {!sdkReady ? (
                                   <Loader /> 
                                ) : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroupItem>
                        )}

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen