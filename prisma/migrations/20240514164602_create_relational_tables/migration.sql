/*
  Warnings:

  - Made the column `parentTopicId` on table `ContentTopics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parentSectionId` on table `Topics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContentTopics" ALTER COLUMN "parentTopicId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Topics" ALTER COLUMN "parentSectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "Sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTopics" ADD CONSTRAINT "ContentTopics_parentTopicId_fkey" FOREIGN KEY ("parentTopicId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
