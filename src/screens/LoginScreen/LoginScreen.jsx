import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import FormContainer from '../../components/FormContainer/FormContainer'
import { login } from '../../actions/userActions'
import { useLocation } from 'react-router-dom'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit');
    }


  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>

            <FormGroup controlId='email'>
                <FormLabel>Email Address</FormLabel>
                <FormControl type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup controlId='password'>
                <FormLabel>Password</FormLabel>
                <FormControl type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                </FormControl>
            </FormGroup>

            <Button type='submit' variant='primary'>Sign In</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>

        </Row>



    </FormContainer>
  )
}

export default LoginScreen