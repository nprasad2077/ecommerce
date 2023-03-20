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
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'
import PlaceorderScreen from './screens/PlaceorderScreen/PlaceorderScreen'
import OrderScreen from './screens/OrderScreen/OrderScreen'
import UserListScreen from './screens/UserListScreen/UserListScreen'
import UserEditScreen from './screens/UserEditScreen/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen/ProductListScreen'

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
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/placeorder' element={<PlaceorderScreen />} />
                <Route path='/order/:orderId' element={<OrderScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart/:id?" element={<CartScreen />} />
                <Route path='/admin/userlist' element={<UserListScreen />} />
                <Route path='/admin/user/:userId/edit' element={<UserEditScreen />} />
                <Route path='admin/productlist' element={<ProductListScreen />} />
              </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  )
}

export default App