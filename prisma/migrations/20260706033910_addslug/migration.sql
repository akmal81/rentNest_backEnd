/*
  Warnings:

  - You are about to drop the column `landLoardId` on the `properties` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `landLordId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_landLoardId_fkey";

-- DropIndex
DROP INDEX "properties_categoryId_key";

-- DropIndex
DROP INDEX "properties_landLoardId_idx";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "slug" VARCHAR(255);

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "landLoardId",
ADD COLUMN     "landLordId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "properties_landLordId_idx" ON "properties"("landLordId");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landLordId_fkey" FOREIGN KEY ("landLordId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
