import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import FormContainer from '../../components/FormContainer/FormContainer'
import { register } from '../../actions/userActions'
import { useLocation, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigation(redirect)
        }
    }, [navigation, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }



  return (
    <FormContainer>
        <h1>Sign In</h1>
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
                <FormControl required type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup controlId='passwordConfirm'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                </FormControl>
            </FormGroup>

            <Button type='submit' variant='primary'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>

        </Row>

    </FormContainer>
  )
}

export default RegisterScreen