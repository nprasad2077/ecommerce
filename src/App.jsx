import React from 'react'
import { Container } from 'react-bootstrap'

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
            <h1>Welcome!</h1>
          </Container>
        </main>
      <Footer />
    </div>
  )
}

export default App