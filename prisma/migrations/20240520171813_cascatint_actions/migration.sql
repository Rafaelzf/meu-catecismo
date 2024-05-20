-- DropForeignKey
ALTER TABLE "Ask" DROP CONSTRAINT "Ask_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsAsks" DROP CONSTRAINT "QuestionsAsks_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_parentSectionId_fkey";

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "Sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAsks" ADD CONSTRAINT "QuestionsAsks_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ask" ADD CONSTRAINT "Ask_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionsAsks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
