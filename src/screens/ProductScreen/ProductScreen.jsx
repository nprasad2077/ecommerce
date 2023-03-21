import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails} from '../../actions/productActions'
import { useNavigate } from 'react-router-dom'

// Components 
import Rating from '../../components/Rating/Rating'
import products from '../../products'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const {id} = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)

  }



  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ?
        <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>
        : (      <Row>
          <Col md={6}>
            <Image src={'http://127.0.0.1:8000'+ product.image} alt={product.name} fluid/>
          </Col>
  
          <Col md={3}>
            <ListGroup variant='flush'>
  
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
  
              <ListGroupItem>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
              </ListGroupItem>
  
              <ListGroupItem>
                Price: {product.price}
              </ListGroupItem>
  
              <ListGroupItem>
                Description: {product.description}
              </ListGroupItem>
  
            </ListGroup>
          </Col>
  
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Price: 
                    </Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
  
                <ListGroupItem>
                  <Row>
                    <Col>
                      Status: 
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs='auto' className='my-1'>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option value={x + 1} key={x+1}>
                                {x + 1}
                              </option>
                            ))
                          }

                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
  
                <ListGroupItem>
                  <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock == 0}>Add to Cart</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
  
          </Col>
        </Row>)

      }

    </div>
  )
}

export default ProductScreen