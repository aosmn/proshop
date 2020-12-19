import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; aosmn
            <p className='text-center text-secondary'>
              <small>
                <strong className='text-danger'>Disclaimer: </strong>This is a
                sample app, please don't make payments, or expect any orders to
                be delivered
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
