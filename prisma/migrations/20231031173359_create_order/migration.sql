-- CreateTable
CREATE TABLE "ShippingFee" (
    "prefectures" TEXT NOT NULL,
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "label" TEXT NOT NULL,
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "OrderOnAddress" (
    "orderId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "prefectures" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "shippingFeeAmount" INTEGER NOT NULL,
    "paymentMethodLabel" TEXT NOT NULL,
    "leadTimeLabel" TEXT NOT NULL,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_id_fkey" FOREIGN KEY ("id") REFERENCES "OrderOnAddress" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_paymentMethodLabel_fkey" FOREIGN KEY ("paymentMethodLabel") REFERENCES "PaymentMethod" ("label") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_leadTimeLabel_fkey" FOREIGN KEY ("leadTimeLabel") REFERENCES "LeadTime" ("label") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderOnFurnitureItem" (
    "orderId" TEXT NOT NULL,
    "furnitureItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "furnitureItemId"),
    CONSTRAINT "OrderOnFurnitureItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderOnFurnitureItem_furnitureItemId_fkey" FOREIGN KEY ("furnitureItemId") REFERENCES "FurnitureItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingFee_prefectures_key" ON "ShippingFee"("prefectures");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_label_key" ON "PaymentMethod"("label");

-- CreateIndex
CREATE UNIQUE INDEX "OrderOnAddress_orderId_key" ON "OrderOnAddress"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
