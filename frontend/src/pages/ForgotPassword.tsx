import {
  Page,
  Card,
  Text,
  TextField,
  Form,
  FormLayout,
  Button,
} from "@shopify/polaris";
import { useState } from "react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        frontendUrl: window.location.origin + "/suppliers/reset",
      }),
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        alert("Password reset link sent to your email");
      } else {
        alert("Error sending password reset link");
      }
    });
  };
  return (
    <Page narrowWidth>
      <Card>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <Text as="h1" variant="headingSm">
              Forgot Password
            </Text>
            <TextField
              label="Email"
              value={email}
              onChange={(value) => {
                setEmail(value);
              }}
              autoComplete="email"
            ></TextField>
            <Button submit variant="primary">
              Reset Password
            </Button>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
