import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import CartScreen from './screens/CartScreen.js'
import { Container } from 'react-bootstrap'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
