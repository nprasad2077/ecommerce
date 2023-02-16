import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom'


// Components 
import Rating from '../../components/Rating/Rating'
import products from '../../products'

const ProductScreen = () => {
  const {id} = useParams()

  console.log(id);

  const product = products.find((p) => p._id == id)




  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      <Row>
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
            </ListGroup>
          </Card>

        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen