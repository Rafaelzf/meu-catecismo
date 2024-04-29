-- CreateTable
CREATE TABLE "Sections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "icon" TEXT,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topics" (
    "id" SERIAL NOT NULL,
    "parentSlug" TEXT,
    "image" BYTEA,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentTopics" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "parentTopicId" INTEGER,
    "image" BYTEA,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentTopics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageParticularTopic" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageParticularTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAsks" (
    "id" SERIAL NOT NULL,
    "pergunta" TEXT NOT NULL,
    "pageParticularTopicId" INTEGER,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAsks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asks" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "questionsAsksId" INTEGER,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sections_slug_key" ON "Sections"("slug");

-- AddForeignKey
ALTER TABLE "Topics" ADD CONSTRAINT "Topics_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "Sections"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTopics" ADD CONSTRAINT "ContentTopics_parentTopicId_fkey" FOREIGN KEY ("parentTopicId") REFERENCES "Topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAsks" ADD CONSTRAINT "QuestionsAsks_pageParticularTopicId_fkey" FOREIGN KEY ("pageParticularTopicId") REFERENCES "PageParticularTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asks" ADD CONSTRAINT "Asks_questionsAsksId_fkey" FOREIGN KEY ("questionsAsksId") REFERENCES "QuestionsAsks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
