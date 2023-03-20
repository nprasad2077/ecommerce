import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { listProducts } from '../../actions/productActions'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=> {
        if (userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        } else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            //delete products
        }
    }

    const createProductHandler = () => {
        //create product
    }

  return (
    <div>
        <Row>
            <Col className='align-items-center'>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i>{''} Create Product
                </Button>
            </Col>
        </Row>
        {loading
        ? <Loader />
        : error
        ? <Message variant='danger'>{error}</Message> : (
            <Table className='table-sm' striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default ProductListScreen