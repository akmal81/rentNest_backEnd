-- DropForeignKey
ALTER TABLE "rent_requests" DROP CONSTRAINT "rent_requests_propertyId_fkey";

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "rent_requests" ADD CONSTRAINT "rent_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
