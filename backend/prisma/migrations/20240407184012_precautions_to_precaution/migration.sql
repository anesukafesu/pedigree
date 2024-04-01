/*
  Warnings:

  - You are about to drop the column `precautions` on the `BreedPest` table. All the data in the column will be lost.
  - You are about to drop the column `precautions` on the `CultivarPest` table. All the data in the column will be lost.
  - Added the required column `precaution` to the `BreedPest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precaution` to the `CultivarPest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BreedPest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "breed_id" TEXT NOT NULL,
    "pest_id" TEXT NOT NULL,
    "pest_incidence_likelihood_id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "precaution" TEXT NOT NULL,
    CONSTRAINT "BreedPest_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedPest_pest_id_fkey" FOREIGN KEY ("pest_id") REFERENCES "Pest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BreedPest_pest_incidence_likelihood_id_fkey" FOREIGN KEY ("pest_incidence_likelihood_id") REFERENCES "Likelihood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BreedPest" ("breed_id", "id", "pest_id", "pest_incidence_likelihood_id", "treatment") SELECT "breed_id", "id", "pest_id", "pest_incidence_likelihood_id", "treatment" FROM "BreedPest";
DROP TABLE "BreedPest";
ALTER TABLE "new_BreedPest" RENAME TO "BreedPest";
CREATE TABLE "new_CultivarPest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cultivar_id" TEXT NOT NULL,
    "pest_id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "precaution" TEXT NOT NULL,
    "pest_incidence_likelihood_id" TEXT NOT NULL,
    CONSTRAINT "CultivarPest_cultivar_id_fkey" FOREIGN KEY ("cultivar_id") REFERENCES "Cultivar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarPest_pest_id_fkey" FOREIGN KEY ("pest_id") REFERENCES "Pest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CultivarPest_pest_incidence_likelihood_id_fkey" FOREIGN KEY ("pest_incidence_likelihood_id") REFERENCES "Likelihood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CultivarPest" ("cultivar_id", "id", "pest_id", "pest_incidence_likelihood_id", "treatment") SELECT "cultivar_id", "id", "pest_id", "pest_incidence_likelihood_id", "treatment" FROM "CultivarPest";
DROP TABLE "CultivarPest";
ALTER TABLE "new_CultivarPest" RENAME TO "CultivarPest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
