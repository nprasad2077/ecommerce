import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { register } from '../../actions/userActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { listMyOrders } from '../../actions/orderActions'


const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()
    
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigation('/login')
        } else {
            if(!userInfo || !user.name || success)  {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigation, userInfo, dispatch, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
        } 
    }


  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}

            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl required type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='passwordConfirm'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        </Col>


        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                <Loader />
            ): errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : (
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen