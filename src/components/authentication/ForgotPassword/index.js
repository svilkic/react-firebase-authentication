import React, { useRef, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "context/AuthContext";
import { Link } from "react-router-dom";

function Index() {
  const emailRef = useRef();
  const { passwordReset } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await passwordReset(email);
      setMessage("Check your inbox for futher instructions");
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Password Reset</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='info'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-2' id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Button className='w-100 mt-2' type='submit' disabled={loading}>
                Reset Password
              </Button>
              <div className='text-center mt-3'>
                <Link to='/login'>Login</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}

export default Index;
