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
import Shipping from './screens/ShippingScreen';
import Payment from './screens/PaymentScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import Order from './screens/OrderScreen';
import OrderList from './screens/OrderListScreen';
import UserList from './screens/UserListScreen';
import UserEdit from './screens/UserEditScreen';
import ProductList from './screens/ProductListScreen';
import ProductEdit from './screens/ProductEditScreen';

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
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={Payment} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/admin/userlist' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/admin/productlist' component={ProductList} />
          <Route path='/admin/orderlist' component={OrderList} />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />

          <Route exact path='/' component={Home} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
