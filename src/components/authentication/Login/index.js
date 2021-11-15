import React, { useRef, useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Index() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (currentUser) navigate("/profile");
  }, []);

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {currentUser?.email}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-2' id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>

              <Form.Group className='mb-2' id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>

              <Button className='w-100 mt-2' type='submit' disabled={loading}>
                Log In
              </Button>
              <div className='text-center mt-3'>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Container>
  );
}

export default Index;
