-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Breed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "animal_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "breed_name" TEXT NOT NULL,
    "daily_feed_requirement" REAL NOT NULL,
    "daily_water_requirement" REAL NOT NULL,
    "min_temp_requirement" REAL NOT NULL,
    "max_temp_requirement" REAL NOT NULL,
    "annual_fertility_rate" REAL NOT NULL,
    "temperament_rating" REAL,
    CONSTRAINT "Breed_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Breed_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Breed" ("animal_id", "annual_fertility_rate", "breed_name", "daily_feed_requirement", "daily_water_requirement", "id", "max_temp_requirement", "min_temp_requirement", "supplier_id", "temperament_rating") SELECT "animal_id", "annual_fertility_rate", "breed_name", "daily_feed_requirement", "daily_water_requirement", "id", "max_temp_requirement", "min_temp_requirement", "supplier_id", "temperament_rating" FROM "Breed";
DROP TABLE "Breed";
ALTER TABLE "new_Breed" RENAME TO "Breed";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
