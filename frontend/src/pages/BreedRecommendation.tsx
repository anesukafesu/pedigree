import { createFormHelpers, createOptions } from "../utils";
import { getFormOptions } from "../apiHelpers";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Page,
  Card,
  Select,
  Text,
  Form,
  FormLayout,
  Button,
  TextField,
  Modal,
  List,
} from "@shopify/polaris";

export function BreedRecommendation() {
  const [recommendationFormData, setRecommendationFormData] = useState(
    {} as any
  );
  const [formOptions, setFormOptions] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const navigate = useNavigate();

  const { updateProperty } = createFormHelpers(
    recommendationFormData,
    setRecommendationFormData
  );

  const onMount = () => {
    getFormOptions()
      .then((data: any) => {
        setFormOptions(data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    // Submit form data to backend
    fetch("/api/animal/recommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recommendationFormData),
    })
      .then(async (response) => {
        const data = await response.json();
        setRecommendations(data);
        setModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(onMount, []);

  return (
    <Page
      title="Animal Recommendation"
      backAction={{ onAction: () => navigate("/") }}
    >
      <Card>
        {loading && <Text as="p">Loading...</Text>}
        {error && <Text as="p">Something went wrong while loading data</Text>}
        {!loading && !error && (
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={recommendationFormData.name}
                onChange={(value) => {
                  updateProperty("name", value);
                }}
                autoComplete="name"
                label="Name"
                placeholder="Enter your name here"
              ></TextField>
              <TextField
                value={recommendationFormData.email}
                onChange={(value) => {
                  updateProperty("email", value);
                }}
                label="Email"
                autoComplete="email"
                placeholder="Enter your email here"
              ></TextField>
              <Select
                value={recommendationFormData.animal_id}
                label="Animal"
                onChange={(value) => {
                  updateProperty("animal_id", value);
                }}
                options={createOptions(formOptions.animal)}
              ></Select>
              <Select
                value={recommendationFormData.most_important_product_id}
                label="Most Important Product"
                onChange={(value) => {
                  updateProperty("most_important_product_id", value);
                }}
                options={createOptions(formOptions.product)}
              ></Select>
              <TextField
                onChange={(value) =>
                  updateProperty("min_temperature", Number(value))
                }
                value={recommendationFormData.min_temperature}
                autoComplete="none"
                label="Min Temperature (°C)"
                type="number"
              ></TextField>
              <TextField
                onChange={(value) =>
                  updateProperty("max_temperature", Number(value))
                }
                value={recommendationFormData.max_temperature}
                autoComplete="none"
                label="Max Temperature (°C)"
                type="number"
              ></TextField>
              <br />
              <Button variant="primary" submit>
                Get recommendation
              </Button>
            </FormLayout>
          </Form>
        )}
      </Card>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        title="Recommendations"
      >
        <Modal.Section>
          {recommendations.length && (
            <List type="number">
              {recommendations.map((recommendation: any) => (
                <>
                  <Text as="p">
                    We have sent the recommendations in more detail to your
                    email
                  </Text>
                  <List.Item key={recommendation.id}>
                    {recommendation.name}
                  </List.Item>
                </>
              ))}
            </List>
          )}
          {!recommendations.length && (
            <Text as="p">No recommendations found for the given data</Text>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
}