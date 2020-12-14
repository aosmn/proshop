import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/HomeScreen';
import Product from './screens/ProductScreen';
import Cart from './screens/CartScreen';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import Profile from './screens/ProfileScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile/:id?' component={Profile} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
          <Route exact path='/' component={Home} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
