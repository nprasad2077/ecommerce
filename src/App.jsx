import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'


// Components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen'
import CartScreen from './screens/CartScreen/CartScreen'

const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
                <Route exact path="/" element={<HomeScreen />}  />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart/:id?" element={<CartScreen />} />
              </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  )
}

export default App