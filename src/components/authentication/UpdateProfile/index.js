import React, { useRef, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Index() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = passwordConfirmRef.current.value;
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);
    setError("");
    const promises = [];
    if (email !== currentUser?.email) {
      promises.push(updateUserEmail(email));
    }
    if (password) {
      promises.push(updateUserPassword(password));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-2' id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  ref={emailRef}
                  required
                  defaultValue={currentUser?.email}
                />
              </Form.Group>

              <Form.Group className='mb-2' id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  ref={passwordRef}
                  placeholder='Leave blank to leave the same'
                />
              </Form.Group>

              <Form.Group className='mb-2' id='password-confirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  ref={passwordConfirmRef}
                  placeholder='Leave blank to leave the same'
                />
              </Form.Group>

              <Button className='w-100 mt-2' type='submit' disabled={loading}>
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Link to='/profile'>Cancle</Link>
        </div>
      </div>
    </Container>
  );
}

export default Index;
