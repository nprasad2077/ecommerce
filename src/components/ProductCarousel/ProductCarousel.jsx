import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import Message from '../Message/Message'
import { listTopProducts } from '../../actions/productActions'

const ProductCarousel = () => {

  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const {loading, error, products} = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return ( loading ? <Loader />
  : error
  ? <Message variant='danger'>{error}</Message>
  : (
    <Carousel pause='hover' className='bg-dark'>
        {products.map(product => (
            <CarouselItem key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel.caption'>
                        <h4>{product.name} (${product.price})</h4>
                    </Carousel.Caption>
                </Link>

            </CarouselItem>
        ))}
    </Carousel>
  )
    
  )
}

export default ProductCarousel