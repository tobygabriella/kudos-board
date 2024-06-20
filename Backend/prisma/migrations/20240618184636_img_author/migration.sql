/*
  Warnings:

  - Added the required column `author` to the `KudoBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `KudoBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `KudoCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KudoBoard" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "KudoCard" ADD COLUMN     "imgUrl" TEXT NOT NULL;
