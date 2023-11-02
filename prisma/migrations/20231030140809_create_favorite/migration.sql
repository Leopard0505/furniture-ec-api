-- CreateTable
CREATE TABLE "Favorite" (
    "userId" INTEGER NOT NULL,
    "furnitureItemId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "furnitureItemId"),
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_furnitureItemId_fkey" FOREIGN KEY ("furnitureItemId") REFERENCES "FurnitureItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
