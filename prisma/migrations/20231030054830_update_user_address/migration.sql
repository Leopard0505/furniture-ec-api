/*
  Warnings:

  - Added the required column `address` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKana` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNo` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefectures` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "prefectures" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserAddress" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "UserAddress";
DROP TABLE "UserAddress";
ALTER TABLE "new_UserAddress" RENAME TO "UserAddress";
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
