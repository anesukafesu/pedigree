export function createInitialState(type: "breed" | "cultivar") {
  // @ts-ignore

  if (type === "breed") {
    return {
      breed_name: "",
      animal_id: "2adb3610-1296-41bb-beb3-79de2bbd0407",
      daily_feed_requirement: 0,
      daily_water_requirement: 0,
      min_temp_requirement: 0,
      max_temp_requirement: 0,
      annual_fertility_rate: 0,
      expected_product_yields: [],
      diseases: [],
      pests: [],
    };
  } else {
    return {
      name: "",
      crop_id: "0d6f33b3-853d-4485-9fb8-fb69b92d55a3",
      min_temp_requirement: 0,
      max_temp_requirement: 0,
      min_daily_irrigation: 0,
      max_daily_irrigation: 0,
      min_annual_cold_hours: 0,
      max_annual_cold_hours: 0,
      min_soil_pH: 0,
      max_soil_pH: 0,
      soil_type_id: "e45ea45d-1cdd-43ea-9cd4-4cd386adf639",
      diseases: [],
      pests: [],
      expected_product_yields: [],
      fertiliser_applications: [],
    };
  }
}
