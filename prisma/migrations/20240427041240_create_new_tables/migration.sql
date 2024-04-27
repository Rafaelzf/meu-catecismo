-- CreateTable
CREATE TABLE "Topics" (
    "id" SERIAL NOT NULL,
    "parent_slug" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentTopics" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentTopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAsks" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,

    CONSTRAINT "QuestionsAsks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentQuestionsAsks" (
    "id" SERIAL NOT NULL,
    "pergunta" TEXT NOT NULL,

    CONSTRAINT "ContentQuestionsAsks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asks" (
    "id" SERIAL NOT NULL,
    "pergunta" TEXT NOT NULL,

    CONSTRAINT "Asks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentAsks" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ContentAsks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentTopicsToTopics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentQuestionsAsksToQuestionsAsks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AsksToContentAsks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AsksToContentQuestionsAsks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContentTopicsToTopics_AB_unique" ON "_ContentTopicsToTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentTopicsToTopics_B_index" ON "_ContentTopicsToTopics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentQuestionsAsksToQuestionsAsks_AB_unique" ON "_ContentQuestionsAsksToQuestionsAsks"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentQuestionsAsksToQuestionsAsks_B_index" ON "_ContentQuestionsAsksToQuestionsAsks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AsksToContentAsks_AB_unique" ON "_AsksToContentAsks"("A", "B");

-- CreateIndex
CREATE INDEX "_AsksToContentAsks_B_index" ON "_AsksToContentAsks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AsksToContentQuestionsAsks_AB_unique" ON "_AsksToContentQuestionsAsks"("A", "B");

-- CreateIndex
CREATE INDEX "_AsksToContentQuestionsAsks_B_index" ON "_AsksToContentQuestionsAsks"("B");

-- AddForeignKey
ALTER TABLE "_ContentTopicsToTopics" ADD CONSTRAINT "_ContentTopicsToTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentTopics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTopicsToTopics" ADD CONSTRAINT "_ContentTopicsToTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "Topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentQuestionsAsksToQuestionsAsks" ADD CONSTRAINT "_ContentQuestionsAsksToQuestionsAsks_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentQuestionsAsks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentQuestionsAsksToQuestionsAsks" ADD CONSTRAINT "_ContentQuestionsAsksToQuestionsAsks_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionsAsks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AsksToContentAsks" ADD CONSTRAINT "_AsksToContentAsks_A_fkey" FOREIGN KEY ("A") REFERENCES "Asks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AsksToContentAsks" ADD CONSTRAINT "_AsksToContentAsks_B_fkey" FOREIGN KEY ("B") REFERENCES "ContentAsks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AsksToContentQuestionsAsks" ADD CONSTRAINT "_AsksToContentQuestionsAsks_A_fkey" FOREIGN KEY ("A") REFERENCES "Asks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AsksToContentQuestionsAsks" ADD CONSTRAINT "_AsksToContentQuestionsAsks_B_fkey" FOREIGN KEY ("B") REFERENCES "ContentQuestionsAsks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
