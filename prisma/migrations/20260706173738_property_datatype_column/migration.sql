/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `properties` table. All the data in the column will be lost.
  - You are about to alter the column `rentAmount` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "isAvailable",
ADD COLUMN     "availablity" "PropertyAvailablity" NOT NULL DEFAULT 'AVAILABLE',
ALTER COLUMN "rentAmount" SET DATA TYPE INTEGER;
