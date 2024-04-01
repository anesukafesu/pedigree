import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  Text,
  ButtonGroup,
} from "@shopify/polaris";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = useCallback((value: string) => setEmail(value), []);
  const handlePasswordChange = useCallback(
    (value: string) => setPassword(value),
    []
  );
  const handleSubmit = async () => {
    // Submit email and password to backend
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Store token in Redux store
      dispatch({
        type: "SET_TOKEN",
        payload: {
          token: data.token,
        },
      });

      // Redirect to dashboard page
      navigate("/suppliers/");
    } else {
      // Show error message
      alert("Invalid email or password");
    }
  };

  return (
    <Page narrowWidth>
      <Card>
        <Text as="h1" variant="headingLg">
          Login
        </Text>
        <br />
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={email}
              label="Email"
              type="email"
              autoComplete="email"
              onChange={handleEmailChange}
            />
            <TextField
              value={password}
              label="Password"
              type="password"
              autoComplete="password"
              onChange={handlePasswordChange}
            />
            <ButtonGroup>
              <Button submit variant="primary">
                Login
              </Button>
              <Button>Forgot Password</Button>
            </ButtonGroup>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
