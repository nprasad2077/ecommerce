import React from 'react'
import products from '../../products'
import { Row, Col } from 'react-bootstrap'

// Component
import Product from '../../components/Product/Product'

const HomeScreen = () => {
  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {products.map((prod) => (
                <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                    <Product prod={prod}/>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen