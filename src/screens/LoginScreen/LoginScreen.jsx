import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import FormContainer from '../../components/FormContainer/FormContainer'
import { login } from '../../actions/userActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


  return (
    <FormContainer>
        Login Screen
    </FormContainer>
  )
}

export default LoginScreen