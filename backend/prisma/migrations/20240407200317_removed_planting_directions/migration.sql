/*
  Warnings:

  - You are about to drop the column `directions_for_planting` on the `Cultivar` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cultivar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "crop_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "min_temp_requirement" REAL NOT NULL,
    "max_temp_requirement" REAL NOT NULL,
    "min_daily_irrigation" REAL NOT NULL,
    "max_daily_irrigation" REAL NOT NULL,
    "min_annual_cold_hours" REAL NOT NULL,
    "max_annual_cold_hours" REAL NOT NULL,
    "min_soil_pH" REAL NOT NULL,
    "max_soil_pH" REAL NOT NULL,
    "soil_type_id" TEXT NOT NULL,
    CONSTRAINT "Cultivar_crop_id_fkey" FOREIGN KEY ("crop_id") REFERENCES "Crop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cultivar_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cultivar_soil_type_id_fkey" FOREIGN KEY ("soil_type_id") REFERENCES "SoilType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cultivar" ("crop_id", "id", "max_annual_cold_hours", "max_daily_irrigation", "max_soil_pH", "max_temp_requirement", "min_annual_cold_hours", "min_daily_irrigation", "min_soil_pH", "min_temp_requirement", "name", "soil_type_id", "supplier_id") SELECT "crop_id", "id", "max_annual_cold_hours", "max_daily_irrigation", "max_soil_pH", "max_temp_requirement", "min_annual_cold_hours", "min_daily_irrigation", "min_soil_pH", "min_temp_requirement", "name", "soil_type_id", "supplier_id" FROM "Cultivar";
DROP TABLE "Cultivar";
ALTER TABLE "new_Cultivar" RENAME TO "Cultivar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
