import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { useLocation, useNavigate } from 'react-router-dom'
import { listUsers } from '../../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    useEffect(()=> {
        dispatch(listUsers)
    }, [dispatch])

  return (
    <div>
        <h1>Users</h1>
    </div>
  )
}

export default UserListScreen