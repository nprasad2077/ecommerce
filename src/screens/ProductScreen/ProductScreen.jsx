import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {listProductDetails} from '../../actions/productActions'


// Components 
import Rating from '../../components/Rating/Rating'
import products from '../../products'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'

const ProductScreen = () => {

  const {id} = useParams()
  // console.log(id);

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])



  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ?
        <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>
        : (      <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
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
  
                <ListGroupItem>
                  <Button className='btn-block' type='button' disabled={product.countInStock == 0}>Add to Cart</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
  
          </Col>
        </Row>)

      }


      {/* <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
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

              <ListGroupItem>
                <Button className='btn-block' type='button' disabled={product.countInStock == 0}>Add to Cart</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>

        </Col>
      </Row> */}
    </div>
  )
}

export default ProductScreen