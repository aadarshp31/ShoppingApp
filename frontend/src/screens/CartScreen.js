import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  FormControl,
  Button,
} from 'react-bootstrap'
import Message from '../components/Message.js'
import { addToCart, removeFromCart } from '../actions/cartActions.js'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  let qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      checkProductQuantity()
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const checkProductQuantity = () => {
    cartItems.map((item) => {
      if (item.product === productId) {
        qty = item.countInStock < qty ? item.countInStock : qty
      }
    })
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2} className='my-auto'>
                    <Link to={`/product/${item.product}`}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Link>
                  </Col>
                  <Col md={2} className='my-auto'>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className='my-auto'>
                    ₹ {item.price}
                  </Col>
                  <Col md={3} className='my-auto'>
                    <FormControl
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((key) => (
                        <option key={key + 1} value={key + 1}>
                          {key + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2} className='my-auto'>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => {
                        removeFromCartHandler(item.product)
                      }}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹{' '}
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block btn-md'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
