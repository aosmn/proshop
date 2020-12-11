import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.js';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const productsList = products.map(product => (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
  ));

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>{productsList}</Row>
    </>
  );
};

export default HomeScreen;
