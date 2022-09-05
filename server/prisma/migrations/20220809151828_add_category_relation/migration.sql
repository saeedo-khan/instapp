/*
  Warnings:

  - You are about to drop the column `categoryCategory_id` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryCategory_id_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "postId" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "categoryCategory_id";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
