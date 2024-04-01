/*
  Warnings:

  - You are about to drop the column `max_supported_temp` on the `Cultivar` table. All the data in the column will be lost.
  - You are about to drop the column `min_supported_temp` on the `Cultivar` table. All the data in the column will be lost.
  - Added the required column `max_temp_required` to the `Cultivar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_temp_required` to the `Cultivar` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cultivar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "crop_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "min_temp_required" REAL NOT NULL,
    "max_temp_required" REAL NOT NULL,
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
INSERT INTO "new_Cultivar" ("crop_id", "directions_for_planting", "id", "max_annual_cold_hours", "max_daily_irrigation", "max_soil_ph", "min_annual_cold_hours", "min_daily_irrigation", "min_soil_ph", "name", "soil_type_id", "supplier_id") SELECT "crop_id", "directions_for_planting", "id", "max_annual_cold_hours", "max_daily_irrigation", "max_soil_ph", "min_annual_cold_hours", "min_daily_irrigation", "min_soil_ph", "name", "soil_type_id", "supplier_id" FROM "Cultivar";
DROP TABLE "Cultivar";
ALTER TABLE "new_Cultivar" RENAME TO "Cultivar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
