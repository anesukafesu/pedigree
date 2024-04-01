import { Page, Card, Text } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreedsList, CultivarsList } from "../components";
import { authenticatedFetch } from "../apiHelpers";

export function Suppliers() {
  const store = useStore();
  const navigate = useNavigate();
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(false);

  // @ts-ignore
  const { token, formOptions } = store.getState();

  const onMount = () => {
    // Redirect to login if token is missing
    if (!token) {
      navigate("/suppliers/login");
    } else {
      // Fetch options if they do not already exist
      if (!formOptions)
        authenticatedFetch("/api/form-options")
          .then(async (response) => {
            const formOptions = await response.json();
            store.dispatch({ type: "SET_FORM_OPTIONS", formOptions });
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setError(true);
            setLoading(false);
          });
    }
  };

  useEffect(onMount, []);

  if (!token) return <Text as="p">Redirecting you to login...</Text>;
  else
    return (
      <Page
        title="Dashboard"
        actionGroups={[
          {
            title: "Create new",
            actions: [
              {
                content: "Create new breed",
                onAction: () => navigate("/suppliers/edit-breed/new"),
              },
              {
                content: "Create new cultivar",
                onAction: () => navigate("/suppliers/edit-cultivar/new"),
              },
            ],
          },
        ]}
      >
        <Card>
          <BreedsList />
          <br />
          <CultivarsList />
        </Card>
      </Page>
    );
}
