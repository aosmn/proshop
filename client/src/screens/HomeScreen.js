import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product.js';

const HomeScreen = () => {
  const productsList = products.map(product => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ));
  return <Row>{productsList}</Row>;
};

export default HomeScreen;
