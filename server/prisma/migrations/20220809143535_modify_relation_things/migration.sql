/*
  Warnings:

  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryCategory_id" TEXT;

-- DropTable
DROP TABLE "_CategoryToPost";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryCategory_id_fkey" FOREIGN KEY ("categoryCategory_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;
