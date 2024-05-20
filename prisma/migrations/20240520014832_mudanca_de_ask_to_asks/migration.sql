/*
  Warnings:

  - You are about to drop the column `ask` on the `QuestionsAsks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionsAsks" DROP COLUMN "ask",
ADD COLUMN     "asks" JSONB[];
