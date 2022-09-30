-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "isFollower" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PostLike" ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isFollower" BOOLEAN;
