/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `BrandCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `FurnitureCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `LeadTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BrandCategory_value_key" ON "BrandCategory"("value");

-- CreateIndex
CREATE UNIQUE INDEX "FurnitureCategory_value_key" ON "FurnitureCategory"("value");

-- CreateIndex
CREATE UNIQUE INDEX "LeadTime_value_key" ON "LeadTime"("value");
