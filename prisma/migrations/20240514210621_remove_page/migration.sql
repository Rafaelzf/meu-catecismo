/*
  Warnings:

  - You are about to drop the column `page` on the `Topic` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Topic_page_key";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "page";
