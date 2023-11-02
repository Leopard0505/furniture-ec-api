/*
  Warnings:

  - You are about to drop the column `name` on the `FurnitureItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FurnitureItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "funitureId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FurnitureItem_funitureId_fkey" FOREIGN KEY ("funitureId") REFERENCES "Furniture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FurnitureItem" ("color", "createdAt", "description", "funitureId", "id", "image", "price", "size", "updatedAt", "weight") SELECT "color", "createdAt", "description", "funitureId", "id", "image", "price", "size", "updatedAt", "weight" FROM "FurnitureItem";
DROP TABLE "FurnitureItem";
ALTER TABLE "new_FurnitureItem" RENAME TO "FurnitureItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
