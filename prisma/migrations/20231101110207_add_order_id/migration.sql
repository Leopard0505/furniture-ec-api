/*
  Warnings:

  - You are about to alter the column `id` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderOnFurnitureItem" (
    "orderId" TEXT NOT NULL,
    "furnitureItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "furnitureItemId"),
    CONSTRAINT "OrderOnFurnitureItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderOnFurnitureItem_furnitureItemId_fkey" FOREIGN KEY ("furnitureItemId") REFERENCES "FurnitureItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderOnFurnitureItem" ("furnitureItemId", "orderId", "quantity") SELECT "furnitureItemId", "orderId", "quantity" FROM "OrderOnFurnitureItem";
DROP TABLE "OrderOnFurnitureItem";
ALTER TABLE "new_OrderOnFurnitureItem" RENAME TO "OrderOnFurnitureItem";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT NOT NULL,
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
    CONSTRAINT "Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderOnAddress" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_paymentMethodLabel_fkey" FOREIGN KEY ("paymentMethodLabel") REFERENCES "PaymentMethod" ("label") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_leadTimeLabel_fkey" FOREIGN KEY ("leadTimeLabel") REFERENCES "LeadTime" ("label") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("canceledAt", "createdAt", "id", "leadTimeLabel", "paymentMethodLabel", "saleTaxRate", "shippingFeeAmount", "totalAmount", "updatedAt", "userId") SELECT "canceledAt", "createdAt", "id", "leadTimeLabel", "paymentMethodLabel", "saleTaxRate", "shippingFeeAmount", "totalAmount", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
