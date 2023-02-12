/*
  Warnings:

  - The `acidity` column on the `Coffee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `density` column on the `Coffee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Acidity" AS ENUM ('Bitter', 'Neutral', 'Acid');

-- CreateEnum
CREATE TYPE "Density" AS ENUM ('Tea', 'Neutral', 'Dense');

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "acidity",
ADD COLUMN     "acidity" "Acidity" DEFAULT 'Bitter',
DROP COLUMN "density",
ADD COLUMN     "density" "Density" DEFAULT 'Tea';
