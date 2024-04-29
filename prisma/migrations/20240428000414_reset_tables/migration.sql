/*
  Warnings:

  - You are about to drop the `Asks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentQuestionsAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentTopics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionsAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AsksToContentAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AsksToContentQuestionsAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentQuestionsAsksToQuestionsAsks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentTopicsToTopics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AsksToContentAsks" DROP CONSTRAINT "_AsksToContentAsks_A_fkey";

-- DropForeignKey
ALTER TABLE "_AsksToContentAsks" DROP CONSTRAINT "_AsksToContentAsks_B_fkey";

-- DropForeignKey
ALTER TABLE "_AsksToContentQuestionsAsks" DROP CONSTRAINT "_AsksToContentQuestionsAsks_A_fkey";

-- DropForeignKey
ALTER TABLE "_AsksToContentQuestionsAsks" DROP CONSTRAINT "_AsksToContentQuestionsAsks_B_fkey";

-- DropForeignKey
ALTER TABLE "_ContentQuestionsAsksToQuestionsAsks" DROP CONSTRAINT "_ContentQuestionsAsksToQuestionsAsks_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentQuestionsAsksToQuestionsAsks" DROP CONSTRAINT "_ContentQuestionsAsksToQuestionsAsks_B_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTopicsToTopics" DROP CONSTRAINT "_ContentTopicsToTopics_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTopicsToTopics" DROP CONSTRAINT "_ContentTopicsToTopics_B_fkey";

-- DropTable
DROP TABLE "Asks";

-- DropTable
DROP TABLE "ContentAsks";

-- DropTable
DROP TABLE "ContentQuestionsAsks";

-- DropTable
DROP TABLE "ContentTopics";

-- DropTable
DROP TABLE "QuestionsAsks";

-- DropTable
DROP TABLE "Sections";

-- DropTable
DROP TABLE "Topics";

-- DropTable
DROP TABLE "_AsksToContentAsks";

-- DropTable
DROP TABLE "_AsksToContentQuestionsAsks";

-- DropTable
DROP TABLE "_ContentQuestionsAsksToQuestionsAsks";

-- DropTable
DROP TABLE "_ContentTopicsToTopics";
