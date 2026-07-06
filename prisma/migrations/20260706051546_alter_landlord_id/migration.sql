/*
  Warnings:

  - You are about to drop the column `landLordId` on the `properties` table. All the data in the column will be lost.
  - Added the required column `landlordId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_landLordId_fkey";

-- DropIndex
DROP INDEX "properties_landLordId_idx";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "landLordId",
ADD COLUMN     "landlordId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "properties_landlordId_idx" ON "properties"("landlordId");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
