/*
  Warnings:

  - You are about to drop the column `status` on the `Sections` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Topics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sections" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Topics" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
