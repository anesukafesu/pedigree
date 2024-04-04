import { Page, Card, Button, Text } from "@shopify/polaris";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "react-redux";
import { authenticatedFetch } from "../apiHelpers";

export function Delete() {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const store = useStore();

  // @ts-ignore
  const item = store.getState()[type].find((resource) => resource.id === id);

  const onConfirmDelete = async () => {
    const response = await authenticatedFetch(`/api/${type}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      navigate("/suppliers/");
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <Page>
      <Card>
        <Text as="h1" variant="headingMd">
          Confirm Delete
        </Text>
        <br />
        <Text as="p">Are you sure you want to delete {item.name}?</Text>
        <br />
        <Button variant="primary" onClick={onConfirmDelete}>
          Delete
        </Button>{" "}
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Card>
    </Page>
  );
}
