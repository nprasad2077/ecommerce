import React, {useState, useEffect} from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl, Col, FormCheck} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import { useLocation, useNavigate } from 'react-router-dom'
import {savePaymentMethod} from '../../actions/cartActions'

const PaymentScreen = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  if(!shippingAddress) {
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <FormLabel as='legend'>Select Method</FormLabel>
                <Col>
                    <FormCheck type='radio' label='Paypal or Credit Card' id='paypal' name='paymentMethod' checked onChange={(e)=>setPaymentMethod(e.target.value)}>

                    </FormCheck>
                </Col>
            </FormGroup>

            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
