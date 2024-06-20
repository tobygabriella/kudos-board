/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Board";

-- CreateTable
CREATE TABLE "KudoBoard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "KudoBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KudoCard" (
    "id" SERIAL NOT NULL,
    "messsage" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "KudoCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KudoCard" ADD CONSTRAINT "KudoCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "KudoBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
