/*
  Warnings:

  - You are about to drop the column `postMediaId` on the `PostTag` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PostTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_postMediaId_fkey";

-- DropForeignKey
ALTER TABLE "PostTag" DROP CONSTRAINT "PostTag_userId_fkey";

-- AlterTable
ALTER TABLE "PostTag" DROP COLUMN "postMediaId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "__PostTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__PostTag_AB_unique" ON "__PostTag"("A", "B");

-- CreateIndex
CREATE INDEX "__PostTag_B_index" ON "__PostTag"("B");

-- AddForeignKey
ALTER TABLE "__PostTag" ADD CONSTRAINT "__PostTag_A_fkey" FOREIGN KEY ("A") REFERENCES "PostMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__PostTag" ADD CONSTRAINT "__PostTag_B_fkey" FOREIGN KEY ("B") REFERENCES "PostTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
