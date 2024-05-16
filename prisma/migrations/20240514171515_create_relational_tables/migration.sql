-- CreateTable
CREATE TABLE "Sections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "icon" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" SERIAL NOT NULL,
    "parentSlug" TEXT,
    "parentSectionId" INTEGER NOT NULL,
    "image" BYTEA,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "page" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAsks" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "ask" JSONB[],
    "topicId" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAsks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sections_title_key" ON "Sections"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Sections_slug_key" ON "Sections"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topics_page_key" ON "Topics"("page");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionsAsks_question_key" ON "QuestionsAsks"("question");

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "Sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAsks" ADD CONSTRAINT "QuestionsAsks_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
