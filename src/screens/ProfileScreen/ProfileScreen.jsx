import React, {useState, useEffect} from 'react'
import { Link} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { register } from '../../actions/userActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails } from '../../actions/userActions'


const ProfileScreen = () => {
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen