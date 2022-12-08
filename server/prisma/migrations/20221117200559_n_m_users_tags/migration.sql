-- DropForeignKey
ALTER TABLE "__UsersPostsTag" DROP CONSTRAINT "__UsersPostsTag_A_fkey";

-- AddForeignKey
ALTER TABLE "__UsersPostsTag" ADD CONSTRAINT "__UsersPostsTag_A_fkey" FOREIGN KEY ("A") REFERENCES "PostTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
