-- CreateTable
CREATE TABLE "Topicos" (
    "id" SERIAL NOT NULL,
    "parent_slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topicos_pkey" PRIMARY KEY ("id")
);
