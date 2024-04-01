import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "react-redux";
import { createOptions } from "../utils";
import { useState } from "react";
import { DiseaseForm, PestForm, ExpectedProductYieldForm } from "../components";
import { createFormHelpers, createInitialState } from "../utils";
import { authenticatedFetch } from "../apiHelpers";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Page,
  Select,
  Text,
} from "@shopify/polaris";

export function EditBreed() {
  const navigate = useNavigate();
  const store = useStore();
  const params = useParams();

  // @ts-ignore
  const { formOptions, breeds } = store.getState();
  const initialState =
    params.id == "new"
      ? createInitialState("breed")
      : breeds.find((breed: any) => breed.id == params.id);

  const [breed, setBreed] = useState(initialState);

  const { addItem, updateItem, deleteItem, updateProperty } = createFormHelpers(
    breed,
    setBreed
  );

  const handleSubmit = () => {
    authenticatedFetch("/api/breeds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(breed),
    })
      .then((response) => {
        console.log("Success:", response);
        store.dispatch({ type: "ADD_BREED", payload: breed });
        navigate("/suppliers/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error creating breed");
      });
  };

  return (
    <Page
      title="Breed Information"
      backAction={{ content: "Back", onAction: () => navigate("/suppliers") }}
    >
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={breed.breed_name}
            onChange={(value) => updateProperty("breed_name", value)}
            label="Breed Name"
            type="text"
            autoComplete="none"
          ></TextField>
          <Select
            value={breed.animal_id}
            onChange={(value) => updateProperty("animal_id", value)}
            label="Animal Type"
            options={createOptions(formOptions.animal)}
          ></Select>
          <TextField
            value={breed.daily_feed_requirement}
            onChange={(value) =>
              updateProperty("daily_feed_requirement", Number(value))
            }
            label="Daily Feed Requirement (kg)"
            type="number"
            autoComplete="none"
          ></TextField>
          <TextField
            value={breed.daily_water_requirement}
            onChange={(value) =>
              updateProperty("daily_water_requirement", Number(value))
            }
            label="Daily Water Requirement (L)"
            type="number"
            autoComplete="none"
          ></TextField>
          <TextField
            value={breed.min_temp_requirement}
            onChange={(value) =>
              updateProperty("min_temp_requirement", Number(value))
            }
            label="Min Temperature (°C)"
            type="number"
            autoComplete="none"
          ></TextField>
          <TextField
            value={breed.max_temp_requirement}
            onChange={(value) =>
              updateProperty("max_temp_requirement", Number(value))
            }
            label="Max Temperature (°C)"
            type="number"
            autoComplete="none"
          ></TextField>
          <TextField
            value={breed.annual_fertility_rate}
            onChange={(value) =>
              updateProperty("annual_fertility_rate", Number(value))
            }
            label="Annual Fertility Rate Per Female"
            type="number"
            autoComplete="none"
          ></TextField>
          <Text as="p" variant="headingSm">
            Expected Product Yields
          </Text>
          {breed.expected_product_yields.map(
            (product_yield: any, index: number) => {
              return (
                <ExpectedProductYieldForm
                  product_yield={product_yield}
                  key={index}
                  index={index}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                  formOptions={formOptions}
                />
              );
            }
          )}
          <Button
            variant="secondary"
            onClick={() => addItem("expected_product_yields")}
          >
            Add product
          </Button>
          <Text as="p" variant="headingSm">
            Diseases
          </Text>
          {breed.diseases.map((disease: any, index: number) => {
            return (
              <DiseaseForm
                disease={disease}
                key={index}
                index={index}
                updateItem={updateItem}
                deleteItem={deleteItem}
                formOptions={formOptions}
              />
            );
          })}
          <Button
            onClick={() => {
              addItem("diseases");
            }}
          >
            Add Disease
          </Button>
          <Text as="p" variant="headingSm">
            Pests
          </Text>
          {breed.pests.map((pest: any, index: number) => {
            return (
              <PestForm
                pest={pest}
                key={index}
                index={index}
                updateItem={updateItem}
                deleteItem={deleteItem}
                formOptions={formOptions}
              />
            );
          })}
          <Button
            onClick={() => {
              addItem("pests");
            }}
          >
            Add Pest
          </Button>
        </FormLayout>
        <br />
        <Button variant="primary" submit>
          Add new Breed
        </Button>
      </Form>
    </Page>
  );
}