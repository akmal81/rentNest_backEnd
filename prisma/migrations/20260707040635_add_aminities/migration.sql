-- CreateEnum
CREATE TYPE "Availablity" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "BuiltInWardrobes" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "GasPipeline" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "airConditioning" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "balcony" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "lift" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "modularkitchen" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "parking" "Availablity" NOT NULL DEFAULT 'NO',
ADD COLUMN     "powerBackup" "Availablity" NOT NULL DEFAULT 'NO';
