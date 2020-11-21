import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails } from '../actions/userActions.js'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState(null)
  const [editable, setEditable] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setLastname(user.lastname)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setValidationMessage("Passwords don't match! try again...")
      document.getElementById('password').focus()
    } else {
      setValidationMessage(null)
      // DISPATCH FOR UPDATE USER PROFILE
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <p>
          Account type:{' '}
          {user?.isAdmin ? (
            <span className='text-info'>Admin</span>
          ) : (
            <span className='text-info'>Customer</span>
          )}
        </p>
        {validationMessage && (
          <Message variant='danger'>{validationMessage}</Message>
        )}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>
              Name<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
              minLength={2}
              readOnly={!editable}
              plaintext={!editable}
              size='sm'
            ></Form.Control>
          </Form.Group>
          <Form.Group
            controlId='lastname'
            hidden={lastname.length === 0 && !editable}
          >
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              readOnly={!editable}
              plaintext={!editable}
              size='sm'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>
              Email Address<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              readOnly={!editable}
              plaintext={!editable}
              size='sm'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' hidden={!editable}>
            <Form.Label>
              Enter Password<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$'
              title='Password must contain at least 6 characters, 1 uppercase , 1 lowercase , and 1 number'
              size='sm'
            ></Form.Control>
            <Form.Text className='text-muted'>
              At least 6 characters, 1 uppercase, 1 lowercase, and 1 number
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='confirmPassword' hidden={!editable}>
            <Form.Label>
              Confirm password<span className='text-danger'>*</span>
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
              size='sm'
            ></Form.Control>
            <Form.Text className='text-muted'>
              We'll never share your password with anyone else.
            </Form.Text>
          </Form.Group>
          <Button
            variant={editable ? 'secondary' : 'primary'}
            onClick={(e) => setEditable(!editable)}
            size='sm'
          >
            {editable ? 'Cancel' : 'Edit'}
          </Button>
          <Button type='submit' variant='primary' hidden={!editable} size='sm'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Your Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
