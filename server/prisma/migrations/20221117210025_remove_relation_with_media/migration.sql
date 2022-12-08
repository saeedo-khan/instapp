/*
  Warnings:

  - You are about to drop the column `postMediaId` on the `PostTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_postMediaId_fkey";

-- AlterTable
ALTER TABLE "PostTag" DROP COLUMN "postMediaId";
