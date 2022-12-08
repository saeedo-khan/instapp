/*
  Warnings:

  - You are about to drop the `__PostTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postMediaId` to the `PostTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "__PostTag" DROP CONSTRAINT "__PostTag_A_fkey";

-- DropForeignKey
ALTER TABLE "__PostTag" DROP CONSTRAINT "__PostTag_B_fkey";

-- AlterTable
ALTER TABLE "PostTag" ADD COLUMN     "postMediaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "__PostTag";

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postMediaId_fkey" FOREIGN KEY ("postMediaId") REFERENCES "PostMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
