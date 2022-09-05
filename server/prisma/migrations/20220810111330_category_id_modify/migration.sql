/*
  Warnings:

  - You are about to drop the column `postId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_postId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;
