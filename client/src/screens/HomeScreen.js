import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { listProducts } from '../redux/actions/productActions';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import TopProducts from '../components/TopProducts';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productsList =
    products &&
    products.map(product => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    ));

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {products ? (
        !keyword ? (
          <TopProducts />
        ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )
      ) : null}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>{productsList}</Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
