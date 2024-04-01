-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Supplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset_token" TEXT,
    "password_reset_token_expiration" DATETIME
);
INSERT INTO "new_Supplier" ("email", "id", "name", "password", "password_reset_token", "password_reset_token_expiration") SELECT "email", "id", "name", "password", "password_reset_token", "password_reset_token_expiration" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
