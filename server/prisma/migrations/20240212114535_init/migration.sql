-- CreateEnum
CREATE TYPE "Language" AS ENUM ('russian', 'english');

-- CreateEnum
CREATE TYPE "EventTypes" AS ENUM ('FRIEND_REQUEST', 'INVITED_TO_ROOM', 'USER_ENTERED_ROOM', 'PREMIUM_ACTION_EXPIRED', 'SUBSCRIPTION_ENDING', 'SUPPORT_MESSAGE', 'GIFT_CARD', 'USER_GIFTED_CARD', 'MODERATION_PASSED', 'MOVE_TO_AUCTION');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('GameCard', 'GameField', 'GameSet');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('user', 'manager', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDay" TEXT,
    "language" "Language" NOT NULL DEFAULT 'russian',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "friendId" TEXT,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "event" "EventTypes" NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "GameSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "count_cards" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "discountCost" DOUBLE PRECISION,
    "discount" BOOLEAN NOT NULL,
    "timeDiscount" TIMESTAMP(3) NOT NULL,
    "cardId" TEXT,
    "fieldId" TEXT,
    "setId" TEXT,
    "productType" "ProductType" NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'russian',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'manager',

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hash_tags" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "hash_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameCardToHashTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameFieldToHashTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameSetToHashTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_email_key" ON "users"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_id_key" ON "wallets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_userId_key" ON "wallets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "friends_id_key" ON "friends"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Requests_id_key" ON "Requests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_id_key" ON "Notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fields_id_key" ON "fields"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GameSet_id_key" ON "GameSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- CreateIndex
CREATE UNIQUE INDEX "managers_id_key" ON "managers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "managers_id_email_key" ON "managers"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "hash_tags_id_key" ON "hash_tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCardToHashTags_AB_unique" ON "_GameCardToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCardToHashTags_B_index" ON "_GameCardToHashTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameFieldToHashTags_AB_unique" ON "_GameFieldToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_GameFieldToHashTags_B_index" ON "_GameFieldToHashTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameSetToHashTags_AB_unique" ON "_GameSetToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_GameSetToHashTags_B_index" ON "_GameSetToHashTags"("B");

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_setId_fkey" FOREIGN KEY ("setId") REFERENCES "GameSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToHashTags" ADD CONSTRAINT "_GameCardToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToHashTags" ADD CONSTRAINT "_GameCardToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "hash_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameFieldToHashTags" ADD CONSTRAINT "_GameFieldToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameFieldToHashTags" ADD CONSTRAINT "_GameFieldToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "hash_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSetToHashTags" ADD CONSTRAINT "_GameSetToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "GameSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSetToHashTags" ADD CONSTRAINT "_GameSetToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "hash_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
