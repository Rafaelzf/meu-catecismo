/*
  Warnings:

  - You are about to drop the column `active` on the `Topics` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Topics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContentTopics" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Topics" DROP COLUMN "active",
DROP COLUMN "image";
