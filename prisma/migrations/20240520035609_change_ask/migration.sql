/*
  Warnings:

  - You are about to drop the column `aks` on the `Ask` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ask]` on the table `Ask` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ask` to the `Ask` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ask_aks_key";

-- AlterTable
ALTER TABLE "Ask" DROP COLUMN "aks",
ADD COLUMN     "ask" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ask_ask_key" ON "Ask"("ask");
