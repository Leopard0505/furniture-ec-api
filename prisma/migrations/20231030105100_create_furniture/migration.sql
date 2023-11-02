-- CreateTable
CREATE TABLE "FurnitureCategory" (
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BrandCategory" (
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LeadTime" (
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Furniture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandCategoryLabel" TEXT NOT NULL,
    "leadTimeLabel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Furniture_brandCategoryLabel_fkey" FOREIGN KEY ("brandCategoryLabel") REFERENCES "BrandCategory" ("label") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Furniture_leadTimeLabel_fkey" FOREIGN KEY ("leadTimeLabel") REFERENCES "LeadTime" ("label") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FurnitureCategoriesOnFurnitures" (
    "furnitureId" INTEGER NOT NULL,
    "furnitureCategoryLabel" TEXT NOT NULL,

    PRIMARY KEY ("furnitureId", "furnitureCategoryLabel"),
    CONSTRAINT "FurnitureCategoriesOnFurnitures_furnitureId_fkey" FOREIGN KEY ("furnitureId") REFERENCES "Furniture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FurnitureCategoriesOnFurnitures_furnitureCategoryLabel_fkey" FOREIGN KEY ("furnitureCategoryLabel") REFERENCES "FurnitureCategory" ("label") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FurnitureItem" (
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

-- CreateIndex
CREATE UNIQUE INDEX "FurnitureCategory_label_key" ON "FurnitureCategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "BrandCategory_label_key" ON "BrandCategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "LeadTime_label_key" ON "LeadTime"("label");
