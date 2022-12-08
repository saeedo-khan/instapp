/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `caption` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postTagId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PostTag` table. All the data in the column will be lost.
  - You are about to drop the `PostComment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `updatedAt` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `postMediaId` to the `PostTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PostTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x_coordinates` to the `PostTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y_coordinates` to the `PostTag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostAudienceEnum" AS ENUM ('PUBLIC', 'FRIENDS', 'ONLY_ME', 'SPECIFIC');

-- CreateEnum
CREATE TYPE "MediaPosition" AS ENUM ('IMAGE', 'VIDEO');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postTagId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostComment" DROP CONSTRAINT "PostComment_userId_fkey";

-- DropIndex
DROP INDEX "PostTag_name_key";

-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Follower_id_seq";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "caption",
DROP COLUMN "images",
DROP COLUMN "postTagId",
ADD COLUMN     "audience" "PostAudienceEnum" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "content" TEXT,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "PostTag" DROP COLUMN "name",
ADD COLUMN     "postMediaId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "x_coordinates" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y_coordinates" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "PostComment";

-- CreateTable
CREATE TABLE "PostMedia" (
    "id" TEXT NOT NULL,
    "mediaFile" TEXT NOT NULL,
    "longitude" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,
    "position" "MediaPosition" NOT NULL DEFAULT 'IMAGE',
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "__UsersPostsSpecificAudince" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__UsersPostsSpecificAudince_AB_unique" ON "__UsersPostsSpecificAudince"("A", "B");

-- CreateIndex
CREATE INDEX "__UsersPostsSpecificAudince_B_index" ON "__UsersPostsSpecificAudince"("B");

-- AddForeignKey
ALTER TABLE "PostMedia" ADD CONSTRAINT "PostMedia_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postMediaId_fkey" FOREIGN KEY ("postMediaId") REFERENCES "PostMedia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__UsersPostsSpecificAudince" ADD CONSTRAINT "__UsersPostsSpecificAudince_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__UsersPostsSpecificAudince" ADD CONSTRAINT "__UsersPostsSpecificAudince_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
