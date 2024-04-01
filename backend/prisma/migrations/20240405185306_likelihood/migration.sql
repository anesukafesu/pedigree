/*
  Warnings:

  - You are about to drop the column `likelihood` on the `Likelihood` table. All the data in the column will be lost.
  - Added the required column `name` to the `Likelihood` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Likelihood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Likelihood" ("id", "value") SELECT "id", "value" FROM "Likelihood";
DROP TABLE "Likelihood";
ALTER TABLE "new_Likelihood" RENAME TO "Likelihood";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
