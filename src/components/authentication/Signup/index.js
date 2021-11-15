import React, { useRef, useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Index() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = passwordConfirmRef.current.value;
    if (password !== confirmPassword) return setError("Passwords do not match");
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Failed to create an account");
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
            <h2 className='text-center mb-4'>Sign up</h2>
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

              <Form.Group className='mb-2' id='password-confirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>

              <Button className='w-100 mt-2' type='submit' disabled={loading}>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Already have an account? <Link to='/login'>Log In</Link>
        </div>
      </div>
    </Container>
  );
}

export default Index;
