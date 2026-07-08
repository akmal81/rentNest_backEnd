/*
  Warnings:

  - You are about to drop the column `BuiltInWardrobes` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `GasPipeline` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `airConditioning` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `balcony` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `lift` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `modularkitchen` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `parking` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `powerBackup` on the `properties` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "BuiltInWardrobes",
DROP COLUMN "GasPipeline",
DROP COLUMN "airConditioning",
DROP COLUMN "balcony",
DROP COLUMN "lift",
DROP COLUMN "modularkitchen",
DROP COLUMN "parking",
DROP COLUMN "powerBackup",
ADD COLUMN     "amenities" TEXT[];
