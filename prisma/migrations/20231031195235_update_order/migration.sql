/*
  Warnings:

  - Added the required column `saleTaxRate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL,
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
    CONSTRAINT "Order_id_fkey" FOREIGN KEY ("id") REFERENCES "OrderOnAddress" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_paymentMethodLabel_fkey" FOREIGN KEY ("paymentMethodLabel") REFERENCES "PaymentMethod" ("label") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_leadTimeLabel_fkey" FOREIGN KEY ("leadTimeLabel") REFERENCES "LeadTime" ("label") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("canceledAt", "createdAt", "id", "leadTimeLabel", "paymentMethodLabel", "shippingFeeAmount", "updatedAt", "userId") SELECT "canceledAt", "createdAt", "id", "leadTimeLabel", "paymentMethodLabel", "shippingFeeAmount", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
