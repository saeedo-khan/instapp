-- CreateTable
CREATE TABLE "__UsersPostsTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "__UsersPostsTag_AB_unique" ON "__UsersPostsTag"("A", "B");

-- CreateIndex
CREATE INDEX "__UsersPostsTag_B_index" ON "__UsersPostsTag"("B");

-- AddForeignKey
ALTER TABLE "__UsersPostsTag" ADD CONSTRAINT "__UsersPostsTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__UsersPostsTag" ADD CONSTRAINT "__UsersPostsTag_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
