import React from 'react'
import { Container } from 'react-bootstrap'
import './index.css'

// Components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomeScreen from './screens/HomeScreen/HomeScreen'

const App = () => {
  return (
    <div>
      <Header />
        <main className='py-3'>
          <Container>
            <HomeScreen />
          </Container>
        </main>
      <Footer />
    </div>
  )
}

export default App