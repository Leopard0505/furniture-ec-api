/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Furniture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `FurnitureItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FurnitureItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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
CREATE TABLE "new_Favorite" (
    "userId" INTEGER NOT NULL,
    "furnitureItemId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "furnitureItemId"),
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_furnitureItemId_fkey" FOREIGN KEY ("furnitureItemId") REFERENCES "FurnitureItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("furnitureItemId", "userId") SELECT "furnitureItemId", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Furniture_name_key" ON "Furniture"("name");
