function createAddItem(data: any, setData: any, itemTemplates: any) {
  return (
    type:
      | "pests"
      | "diseases"
      | "expected_product_yields"
      | "fertiliser_applications"
  ) => {
    // Copy existing product yields into new array
    const items = [...data[type]];

    // Add a new empty product yield
    items.push({ ...itemTemplates[type] });

    // Update the state
    setData({ ...data, [type]: items });
  };
}

function createUpdateItem(data: any, setData: any) {
  return (
    type:
      | "pests"
      | "diseases"
      | "expected_product_yields"
      | "fertiliser_applications",
    index: number,
    name: string,
    value: string | number
  ) => {
    // Copy existing breed properties
    const items = [...data[type]];

    // Modify the one we want to change
    items[index][name] = value;

    // Set breed to the new, modified one
    setData({ ...data, [type]: items });
  };
}

function createDeleteItem(data: any, setData: any) {
  return (
    type:
      | "pests"
      | "diseases"
      | "expected_product_yields"
      | "fertiliser_applications",
    index: number
  ) => {
    // Copy items to new array
    const newItems = data[type].filter((_item: any, i: number) => index != i);

    // Modify the state
    setData({ ...data, [type]: newItems });
  };
}

function createUpdateProperty(data: any, setData: any) {
  return (name: string, value: string | number) => {
    // Copy existing breed properties
    const newData = { ...data };

    // Modify the one we want to change
    newData[name] = value;

    // Set breed to the new, modified one
    setData(newData);
  };
}

export function createFormHelpers(data: any, setData: any) {
  const itemTemplates = {
    pests: {
      pest_id: "209861e1-6877-4064-8aae-d5080b604e25",
      pest_incidence_likelihood_id: "b06d07b4-1ceb-4b11-a6ba-2f7ff4a65e49",
      treatment: "",
      precaution: "",
    },
    expected_product_yields: {
      product_id: "67ae9d7e-a997-4a01-ac56-91bda0ec14c4",
      product_unit_id: "ec0e9f76-5c59-4ed2-a93d-2b10f52a4b6b",
      average_quantity_produced: 0,
    },
    diseases: {
      disease_id: "1c330f6e-86d2-41c3-a487-c3ae9e4fd1e5",
      disease_incidence_likelihood_id: "b06d07b4-1ceb-4b11-a6ba-2f7ff4a65e49",
      treatment: "",
      precaution: "",
    },
    fertiliser_applications: {
      fertiliser_id: "44f18c41-deb4-4df0-b655-dd9af7d60ad9",
      milestone_for_application: "",
      quantity_per_plant: 0,
    },
  };

  return {
    addItem: createAddItem(data, setData, itemTemplates),
    updateItem: createUpdateItem(data, setData),
    deleteItem: createDeleteItem(data, setData),
    updateProperty: createUpdateProperty(data, setData),
  };
}
