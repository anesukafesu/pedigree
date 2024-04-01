/*
  Warnings:

  - You are about to drop the `AnimalShelter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BreedAnimalShelter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AnimalShelter";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BreedAnimalShelter";
PRAGMA foreign_keys=on;
