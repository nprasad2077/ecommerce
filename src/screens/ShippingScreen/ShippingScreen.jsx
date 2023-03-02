import React, {useState, useEffect} from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer/FormContainer'
import { useLocation, useNavigate } from 'react-router-dom'

const ShippingScreen = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit');
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
            <FormGroup controlId='address'>
                <FormLabel>Address</FormLabel>
                <FormControl required type='text' placeholder='Enter address' value={address ? address: ''} onChange={(e) => setAddress(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup controlId='city'>
                <FormLabel>City</FormLabel>
                <FormControl required type='text' placeholder='Enter city' value={city ? city: ''} onChange={(e) => setCity(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup controlId='postalCode'>
                <FormLabel>Postal Code</FormLabel>
                <FormControl required type='text' placeholder='Enter postal code' value={postalCode ? postalCode: ''} onChange={(e) => setPostalCode(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup controlId='country'>
                <FormLabel>Country</FormLabel>
                <FormControl required type='text' placeholder='Enter country' value={country ? country: ''} onChange={(e) => setCountry(e.target.value)}>
                </FormControl>
            </FormGroup>

            <Button type='submit' variant='primary'>Continue</Button>

      </Form>

    </FormContainer>
  )
}

export default ShippingScreen