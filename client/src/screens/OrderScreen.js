import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
import {
  getOrderDetails,
  payOrder,
  orderReset,
  deliverOrder,
  orderDeliverReset
} from '../redux/actions/orderActions';

const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSkdReady] = useState(false);
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success, error: errorPay } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver
  } = orderDeliver;

  if (!loading && order) {
    // Calculate Prices
    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2);
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setSkdReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order._id !== orderId) {
      if (!order || success || successDeliver) {
        dispatch(orderReset);
        dispatch(orderDeliverReset);
        dispatch(getOrderDetails(orderId));
      }
    } else if (order && !order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSkdReady(true);
      }
    }
  }, [dispatch, orderId, order, success, successDeliver, history, userInfo]);

  const successPaymentHandler = (details, data) => {
    dispatch(payOrder(orderId, details));
  };
  const deliverHandler = (details, data) => {
    dispatch(deliverOrder(orderId));
  };
  return loading ? (
    <Loader />
  ) : !order ? (
    <Message variant='danger'>Order Not Found</Message>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>
                  Deliverd on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='warning'>Not delivered.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not paid.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            fluid
                            rounded
                            src={item.image}
                            alt={item.name}
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}x${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {userInfo && userInfo.isAdmin ? (
                !order.isDelivered ? (
                  order.isPaid && (
                    <ListGroup.Item>
                      {loadingDeliver ? (
                        <Loader />
                      ) : (
                        errorDeliver && (
                          <Message variant='danger'>{errorDeliver}</Message>
                        )
                      )}
                      <Button
                        type='button'
                        className='btn-block'
                        onClick={deliverHandler}>
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )
                ) : (
                  <Message variant='info'>Order out for delivery</Message>
                )
              ) : (
                !order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {errorPay && <Message variant='danger'>{errorPay}</Message>}

                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
