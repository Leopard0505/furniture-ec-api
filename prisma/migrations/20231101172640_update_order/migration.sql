/*
  Warnings:

  - Added the required column `leadTimeValue` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderUniqueId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "shippingFeeAmount" INTEGER NOT NULL,
    "paymentMethodLabel" TEXT NOT NULL,
    "paymentMethodAmount" INTEGER NOT NULL,
    "leadTimeLabel" TEXT NOT NULL,
    "leadTimeValue" INTEGER NOT NULL,
    "saleTaxRate" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("canceledAt", "createdAt", "id", "leadTimeLabel", "orderUniqueId", "paymentMethodLabel", "saleTaxRate", "shippingFeeAmount", "totalAmount", "updatedAt", "userId") SELECT "canceledAt", "createdAt", "id", "leadTimeLabel", "orderUniqueId", "paymentMethodLabel", "saleTaxRate", "shippingFeeAmount", "totalAmount", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderUniqueId_key" ON "Order"("orderUniqueId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
