import {
  Page,
  Card,
  Text,
  TextField,
  Form,
  FormLayout,
  Button,
} from "@shopify/polaris";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function ResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      }).then((response) => {
        if (response.ok) {
          alert("Password reset successfully.");
          navigate("/suppliers/login");
        } else {
          alert("An error occurred. Please try again.");
        }
      });
    } else {
      alert("Your passwords do not match.");
    }
  };

  return (
    <Page>
      <Card>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <Text as="h1" variant="headingSm">
              Reset Password
            </Text>
            <TextField
              label="New Password"
              type="password"
              onChange={(value) => {
                setPassword(value);
              }}
              value={password}
              autoComplete="password"
            ></TextField>
            <TextField
              type="password"
              label="Confirm Password"
              onChange={(value) => {
                setConfirmPassword(value);
              }}
              value={confirmPassword}
              autoComplete="password"
            ></TextField>
            <Button variant="primary" submit>
              Reset Password
            </Button>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
