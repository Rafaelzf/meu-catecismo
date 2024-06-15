/*
  Warnings:

  - The `icon` column on the `Sections` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Sections" DROP COLUMN "icon",
ADD COLUMN     "icon" BYTEA;
