/*
  Warnings:

  - You are about to drop the `ContentTopics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PageParticularTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionsAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContentTopics" DROP CONSTRAINT "ContentTopics_parentTopicId_fkey";

-- DropForeignKey
ALTER TABLE "Topics" DROP CONSTRAINT "Topics_parentSectionId_fkey";

-- DropTable
DROP TABLE "ContentTopics";

-- DropTable
DROP TABLE "PageParticularTopic";

-- DropTable
DROP TABLE "QuestionsAsks";

-- DropTable
DROP TABLE "Sections";

-- DropTable
DROP TABLE "Topics";
