/*
  Warnings:

  - You are about to alter the column `orderId` on the `OrderOnAddress` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `OrderOnFurnitureItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `orderId` on the `OrderOnFurnitureItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderUniqueId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderOnAddress" (
    "orderId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "prefectures" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    CONSTRAINT "OrderOnAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderOnAddress" ("address", "email", "name", "nameKana", "orderId", "phoneNo", "prefectures", "zipCode") SELECT "address", "email", "name", "nameKana", "orderId", "phoneNo", "prefectures", "zipCode" FROM "OrderOnAddress";
DROP TABLE "OrderOnAddress";
ALTER TABLE "new_OrderOnAddress" RENAME TO "OrderOnAddress";
CREATE UNIQUE INDEX "OrderOnAddress_orderId_key" ON "OrderOnAddress"("orderId");
CREATE TABLE "new_OrderOnFurnitureItem" (
    "orderId" INTEGER NOT NULL,
    "furnitureItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "furnitureItemId"),
    CONSTRAINT "OrderOnFurnitureItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderOnFurnitureItem_furnitureItemId_fkey" FOREIGN KEY ("furnitureItemId") REFERENCES "FurnitureItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderOnFurnitureItem" ("furnitureItemId", "orderId", "quantity") SELECT "furnitureItemId", "orderId", "quantity" FROM "OrderOnFurnitureItem";
DROP TABLE "OrderOnFurnitureItem";
ALTER TABLE "new_OrderOnFurnitureItem" RENAME TO "OrderOnFurnitureItem";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderUniqueId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "shippingFeeAmount" INTEGER NOT NULL,
    "paymentMethodLabel" TEXT NOT NULL,
    "leadTimeLabel" TEXT NOT NULL,
    "saleTaxRate" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_paymentMethodLabel_fkey" FOREIGN KEY ("paymentMethodLabel") REFERENCES "PaymentMethod" ("label") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_leadTimeLabel_fkey" FOREIGN KEY ("leadTimeLabel") REFERENCES "LeadTime" ("label") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("canceledAt", "createdAt", "id", "leadTimeLabel", "paymentMethodLabel", "saleTaxRate", "shippingFeeAmount", "totalAmount", "updatedAt", "userId") SELECT "canceledAt", "createdAt", "id", "leadTimeLabel", "paymentMethodLabel", "saleTaxRate", "shippingFeeAmount", "totalAmount", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderUniqueId_key" ON "Order"("orderUniqueId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
