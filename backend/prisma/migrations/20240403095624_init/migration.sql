-- CreateTable
CREATE TABLE "Likelihood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "likelihood" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SoilType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Fertiliser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AnimalShelter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SIUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "plural_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ConventionalUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "plural_name" TEXT NOT NULL,
    "si_unit_id" TEXT NOT NULL,
    "conversion_quotient_to_si_unit" REAL NOT NULL,
    CONSTRAINT "ConventionalUnit_si_unit_id_fkey" FOREIGN KEY ("si_unit_id") REFERENCES "SIUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset_token" TEXT NOT NULL,
    "password_reset_token_expiration" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Cultivar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "crop_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "min_supported_temp" REAL NOT NULL,
    "max_supported_temp" REAL NOT NULL,
    "min_daily_irrigation" REAL NOT NULL,
    "max_daily_irrigation" REAL NOT NULL,
    "min_annual_cold_hours" REAL NOT NULL,
    "max_annual_cold_hours" REAL NOT NULL,
    "min_soil_ph" REAL NOT NULL,
    "max_soil_ph" REAL NOT NULL,
    "soil_type_id" TEXT NOT NULL,
    "directions_for_planting" TEXT NOT NULL,
    CONSTRAINT "Cultivar_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "Crop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cultivar_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cultivar_soil_type_id_fkey" FOREIGN KEY ("soil_type_id") REFERENCES "SoilType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultivarProductYield" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cultivar_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "average_quantity_produced" REAL NOT NULL,
    "product_unit_id" TEXT NOT NULL,
    CONSTRAINT "CultivarProductYield_cultivar_id_fkey" FOREIGN KEY ("cultivar_id") REFERENCES "Cultivar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarProductYield_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarProductYield_product_unit_id_fkey" FOREIGN KEY ("product_unit_id") REFERENCES "ConventionalUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultivarFertiliserApplication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cultivar_id" TEXT NOT NULL,
    "fertiliser_id" TEXT NOT NULL,
    "milestone_for_application" TEXT NOT NULL,
    "quantity_per_plant" REAL NOT NULL,
    CONSTRAINT "CultivarFertiliserApplication_cultivar_id_fkey" FOREIGN KEY ("cultivar_id") REFERENCES "Cultivar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarFertiliserApplication_fertiliser_id_fkey" FOREIGN KEY ("fertiliser_id") REFERENCES "Fertiliser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultivarDisease" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cultivar_id" TEXT NOT NULL,
    "disease_id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "precaution" TEXT NOT NULL,
    "likelihoodId" TEXT NOT NULL,
    CONSTRAINT "CultivarDisease_cultivar_id_fkey" FOREIGN KEY ("cultivar_id") REFERENCES "Cultivar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarDisease_disease_id_fkey" FOREIGN KEY ("disease_id") REFERENCES "Disease" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarDisease_likelihoodId_fkey" FOREIGN KEY ("likelihoodId") REFERENCES "Likelihood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultivarPest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cultivar_id" TEXT NOT NULL,
    "pest_id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "precautions" TEXT NOT NULL,
    CONSTRAINT "CultivarPest_cultivar_id_fkey" FOREIGN KEY ("cultivar_id") REFERENCES "Cultivar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarPest_pest_id_fkey" FOREIGN KEY ("pest_id") REFERENCES "Pest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultivarRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "cultivar_id" TEXT NOT NULL,
    "farmer_id" TEXT NOT NULL,
    CONSTRAINT "CultivarRecommendation_cultivar_id_fkey" FOREIGN KEY ("cultivar_id") REFERENCES "Cultivar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarRecommendation_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "animal_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "breed_name" TEXT NOT NULL,
    "daily_feed_requirement" REAL NOT NULL,
    "daily_water_requirement" REAL NOT NULL,
    "min_temp_requirement" REAL NOT NULL,
    "max_temp_requirement" REAL NOT NULL,
    "annual_fertility_rate" REAL NOT NULL,
    "temperament_rating" REAL NOT NULL,
    CONSTRAINT "Breed_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Breed_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreedProductYield" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breed_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_unit_id" TEXT NOT NULL,
    "average_quantity_produced" REAL NOT NULL,
    CONSTRAINT "BreedProductYield_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedProductYield_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedProductYield_product_unit_id_fkey" FOREIGN KEY ("product_unit_id") REFERENCES "ConventionalUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreedAnimalShelter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breed_id" TEXT NOT NULL,
    "animal_shelter_id" TEXT NOT NULL,
    CONSTRAINT "BreedAnimalShelter_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedAnimalShelter_animal_shelter_id_fkey" FOREIGN KEY ("animal_shelter_id") REFERENCES "AnimalShelter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreedRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "breed_id" TEXT NOT NULL,
    "farmer_id" TEXT NOT NULL,
    "breed_feedback" TEXT NOT NULL,
    CONSTRAINT "BreedRecommendation_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedRecommendation_farmer_id_fkey" FOREIGN KEY ("farmer_id") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreedDisease" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breed_id" TEXT NOT NULL,
    "disease_id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "precaution" TEXT NOT NULL,
    "likelihoodId" TEXT NOT NULL,
    CONSTRAINT "BreedDisease_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedDisease_disease_id_fkey" FOREIGN KEY ("disease_id") REFERENCES "Disease" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedDisease_likelihoodId_fkey" FOREIGN KEY ("likelihoodId") REFERENCES "Likelihood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreedPest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breed_id" TEXT NOT NULL,
    "pest_id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "precautions" TEXT NOT NULL,
    CONSTRAINT "BreedPest_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedPest_pest_id_fkey" FOREIGN KEY ("pest_id") REFERENCES "Pest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
