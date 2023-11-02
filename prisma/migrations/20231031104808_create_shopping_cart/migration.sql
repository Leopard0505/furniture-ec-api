-- CreateTable
CREATE TABLE "ShoppingCart" (
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShoppingCartOnFurnitureItem" (
    "shoppingCardId" INTEGER NOT NULL,
    "furnitureItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("shoppingCardId", "furnitureItemId"),
    CONSTRAINT "ShoppingCartOnFurnitureItem_shoppingCardId_fkey" FOREIGN KEY ("shoppingCardId") REFERENCES "ShoppingCart" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShoppingCartOnFurnitureItem_furnitureItemId_fkey" FOREIGN KEY ("furnitureItemId") REFERENCES "FurnitureItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingCart_userId_key" ON "ShoppingCart"("userId");
