import React, {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import FormContainer from '../../components/FormContainer/FormContainer'
import {listProductDetails} from '../../actions/productActions'
import { useNavigate } from 'react-router-dom'

const ProductEditScreen = () => {

    const {productId} = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails


    useEffect(() => {

        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
        
        
    }, [dispatch, product, productId, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        //update products
    }



  return (
    <div>

        <Link to='/admin/productlist'>
            Go Back
        </Link>

        <FormContainer>
        <h1>Edit Products</h1>

        
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl  type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='price'>
                    <FormLabel>Price</FormLabel>
                    <FormControl  type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='image'>
                    <FormLabel>Image</FormLabel>
                    <FormControl  type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='brand'>
                    <FormLabel>Brand</FormLabel>
                    <FormControl  type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='countInStock'>
                    <FormLabel>Stock</FormLabel>
                    <FormControl  type='number' placeholder='Enter stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='category'>
                    <FormLabel>Category</FormLabel>
                    <FormControl  type='category' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId='description'>
                    <FormLabel>Description</FormLabel>
                    <FormControl  type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <Button type='submit' variant='primary'>Update</Button>
            </Form>

        )}

            
        </FormContainer>
    </div>
  )
}

export default ProductEditScreen