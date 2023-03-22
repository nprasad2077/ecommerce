import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import {listProducts} from '../../actions/productActions'
import { useLocation } from 'react-router-dom'

// Component
import Product from '../../components/Product/Product'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import Paginate from '../../components/Paginate/Paginate'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel'

const HomeScreen = () => {
  const location = useLocation()
  let keyword = location && location.search
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products, page, pages} = productList

  console.log(keyword);


  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])



  return (
    <div>
        <ProductCarousel />
        <h1>Latest Products</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            
            <div>
              <Row>
                  {products.map((prod) => (
                      <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                          <Product prod={prod}/>
                      </Col>
                  ))}
              </Row>
              <Paginate pages={pages} page={page} keyword={keyword} />
            </div> 
        
        }
                  


    </div>
  )
}

export default HomeScreen