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
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen/ShippingScreen'

const App = () => {
  return (
    <Router>
      <Header />
        <main className='py-3'>
          <Container>
            <Routes>
                <Route exact path="/" element={<HomeScreen />}  />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/shipping' element={<ShippingScreen />} />
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