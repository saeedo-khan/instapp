/*
  Warnings:

  - You are about to drop the column `favouriteById` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `statusMessage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `thumbUrl` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_favouriteById_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "favouriteById";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "statusMessage",
DROP COLUMN "thumbUrl",
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "profile_pic_url" TEXT;
