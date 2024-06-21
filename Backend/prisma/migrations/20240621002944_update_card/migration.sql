/*
  Warnings:

  - You are about to drop the column `messsage` on the `KudoCard` table. All the data in the column will be lost.
  - Added the required column `description` to the `KudoCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `KudoCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvote` to the `KudoCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudoCard" DROP COLUMN "messsage",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "upvote" INTEGER NOT NULL;
