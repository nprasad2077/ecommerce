import React, {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import FormContainer from '../../components/FormContainer/FormContainer'
import { getUserDetails } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom'

const UserEditScreen = () => {

    const {userId} = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
 
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    useEffect(() => {
        if (!user.name || user._id !== Number(userId)) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
    }



  return (
    <div>

        <Link to='/admin/userlist'>
            Go Back
        </Link>

        <FormContainer>
        <h1>Edit User</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl  type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='isadmin'>
                    <FormCheck type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>

                    </FormCheck>
                </FormGroup>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>

        )}

            
        </FormContainer>
    </div>
  )
}

export default UserEditScreen