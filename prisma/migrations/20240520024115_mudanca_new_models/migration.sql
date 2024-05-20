/*
  Warnings:

  - You are about to drop the column `asks` on the `QuestionsAsks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionsAsks" DROP COLUMN "asks";

-- CreateTable
CREATE TABLE "Ask" (
    "id" SERIAL NOT NULL,
    "aks" TEXT NOT NULL,
    "questionId" INTEGER,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ask_aks_key" ON "Ask"("aks");

-- AddForeignKey
ALTER TABLE "Ask" ADD CONSTRAINT "Ask_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsAsks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
