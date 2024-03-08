/*
  Warnings:

  - You are about to drop the `GameSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameSetToHashTags" DROP CONSTRAINT "_GameSetToHashTags_A_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_setId_fkey";

-- DropTable
DROP TABLE "GameSet";

-- CreateTable
CREATE TABLE "game_sets" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "fieldId" TEXT,

    CONSTRAINT "game_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameCardToGameSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "game_sets_id_key" ON "game_sets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "game_sets_fieldId_key" ON "game_sets"("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCardToGameSet_AB_unique" ON "_GameCardToGameSet"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCardToGameSet_B_index" ON "_GameCardToGameSet"("B");

-- AddForeignKey
ALTER TABLE "game_sets" ADD CONSTRAINT "game_sets_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_setId_fkey" FOREIGN KEY ("setId") REFERENCES "game_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToGameSet" ADD CONSTRAINT "_GameCardToGameSet_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToGameSet" ADD CONSTRAINT "_GameCardToGameSet_B_fkey" FOREIGN KEY ("B") REFERENCES "game_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSetToHashTags" ADD CONSTRAINT "_GameSetToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "game_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
