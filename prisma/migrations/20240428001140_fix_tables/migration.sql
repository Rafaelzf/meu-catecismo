/*
  Warnings:

  - You are about to drop the `Asks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Asks" DROP CONSTRAINT "Asks_questionsAsksId_fkey";

-- DropForeignKey
ALTER TABLE "ContentTopics" DROP CONSTRAINT "ContentTopics_parentTopicId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsAsks" DROP CONSTRAINT "QuestionsAsks_pageParticularTopicId_fkey";

-- DropForeignKey
ALTER TABLE "Topics" DROP CONSTRAINT "Topics_parentSlug_fkey";

-- AlterTable
ALTER TABLE "PageParticularTopic" ADD COLUMN     "content" JSONB[];

-- AlterTable
ALTER TABLE "QuestionsAsks" ADD COLUMN     "resposta" JSONB[];

-- AlterTable
ALTER TABLE "Topics" ADD COLUMN     "content" JSONB[],
ADD COLUMN     "parentSectionId" INTEGER;

-- DropTable
DROP TABLE "Asks";
