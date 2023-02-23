import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

// Component
import Product from '../../components/Product/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const productsUrl = 'http://127.0.0.1:8000/api/products'

  useEffect(() => {
    async function fetchProducts(){
      const {data} = await axios.get('http://127.0.0.1:8000/api/products/')
      setProducts(data)
    }
    fetchProducts()
  }, [])


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