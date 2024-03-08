/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `hash_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "hash_tags_title_key" ON "hash_tags"("title");
