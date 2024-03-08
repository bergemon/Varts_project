/*
  Warnings:

  - Added the required column `image` to the `GameSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `managers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSet" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fields" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "managers" ADD COLUMN     "password" TEXT NOT NULL;
