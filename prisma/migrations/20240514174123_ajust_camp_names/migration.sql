/*
  Warnings:

  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionsAsks" DROP CONSTRAINT "QuestionsAsks_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topics" DROP CONSTRAINT "Topics_parentSectionId_fkey";

-- DropTable
DROP TABLE "Topics";

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "parentSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "parentSectionId" INTEGER NOT NULL,
    "image" BYTEA,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "page" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_title_key" ON "Topic"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_page_key" ON "Topic"("page");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "Sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAsks" ADD CONSTRAINT "QuestionsAsks_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
