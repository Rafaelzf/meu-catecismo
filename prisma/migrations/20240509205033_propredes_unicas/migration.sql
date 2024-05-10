/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `ContentTopics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[page]` on the table `ContentTopics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[page]` on the table `PageParticularTopic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pergunta]` on the table `QuestionsAsks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Sections` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContentTopics_title_key" ON "ContentTopics"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ContentTopics_page_key" ON "ContentTopics"("page");

-- CreateIndex
CREATE UNIQUE INDEX "PageParticularTopic_page_key" ON "PageParticularTopic"("page");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsAsks_pergunta_key" ON "QuestionsAsks"("pergunta");

-- CreateIndex
CREATE UNIQUE INDEX "Sections_title_key" ON "Sections"("title");
