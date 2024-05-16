-- DropForeignKey
ALTER TABLE "QuestionsAsks" DROP CONSTRAINT "QuestionsAsks_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_parentSectionId_fkey";

-- AlterTable
ALTER TABLE "QuestionsAsks" ALTER COLUMN "topicId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "parentSectionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "Sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAsks" ADD CONSTRAINT "QuestionsAsks_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
