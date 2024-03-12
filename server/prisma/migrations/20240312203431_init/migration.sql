-- CreateEnum
CREATE TYPE "Language" AS ENUM ('russian', 'english');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('base', 'premium');

-- CreateEnum
CREATE TYPE "EventTypes" AS ENUM ('FRIEND_REQUEST', 'INVITED_TO_ROOM', 'USER_ENTERED_ROOM', 'PREMIUM_ACTION_EXPIRED', 'SUBSCRIPTION_ENDING', 'SUPPORT_MESSAGE', 'GIFT_CARD', 'USER_GIFTED_CARD', 'MODERATION_PASSED', 'MOVE_TO_AUCTION');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('GameCard', 'GameField', 'GameSet');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('user', 'manager', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'russian',
    "account_type" "AccountType" NOT NULL DEFAULT 'base',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(150),
    "birthday" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_codes" (
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "verification_codes_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,
    "friend_id" TEXT,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "event" "EventTypes" NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_sets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "image" VARCHAR(200) NOT NULL,
    "fieldId" TEXT,

    CONSTRAINT "game_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "count_cards" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "discountCost" DOUBLE PRECISION,
    "discount" BOOLEAN NOT NULL,
    "timeDiscount" TIMESTAMP(3) NOT NULL,
    "cardId" VARCHAR(200),
    "fieldId" VARCHAR(200),
    "setId" VARCHAR(200),
    "productType" "ProductType" NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(200) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'russian',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'manager',

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hash_tags" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "hash_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameCardToHashTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GameCardToGameSet" (
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
CREATE UNIQUE INDEX "verification_codes_hash_key" ON "verification_codes"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_user_id_key" ON "verification_codes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_id_key" ON "wallets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_id_key" ON "Friendship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "requests_id_key" ON "requests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_id_key" ON "notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fields_id_key" ON "fields"("id");

-- CreateIndex
CREATE UNIQUE INDEX "game_sets_id_key" ON "game_sets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "game_sets_fieldId_key" ON "game_sets"("fieldId");

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
CREATE UNIQUE INDEX "hash_tags_title_key" ON "hash_tags"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCardToHashTags_AB_unique" ON "_GameCardToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCardToHashTags_B_index" ON "_GameCardToHashTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameCardToGameSet_AB_unique" ON "_GameCardToGameSet"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCardToGameSet_B_index" ON "_GameCardToGameSet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameFieldToHashTags_AB_unique" ON "_GameFieldToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_GameFieldToHashTags_B_index" ON "_GameFieldToHashTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GameSetToHashTags_AB_unique" ON "_GameSetToHashTags"("A", "B");

-- CreateIndex
CREATE INDEX "_GameSetToHashTags_B_index" ON "_GameSetToHashTags"("B");

-- AddForeignKey
ALTER TABLE "verification_codes" ADD CONSTRAINT "verification_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_sets" ADD CONSTRAINT "game_sets_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_setId_fkey" FOREIGN KEY ("setId") REFERENCES "game_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToHashTags" ADD CONSTRAINT "_GameCardToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToHashTags" ADD CONSTRAINT "_GameCardToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "hash_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToGameSet" ADD CONSTRAINT "_GameCardToGameSet_A_fkey" FOREIGN KEY ("A") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameCardToGameSet" ADD CONSTRAINT "_GameCardToGameSet_B_fkey" FOREIGN KEY ("B") REFERENCES "game_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameFieldToHashTags" ADD CONSTRAINT "_GameFieldToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameFieldToHashTags" ADD CONSTRAINT "_GameFieldToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "hash_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSetToHashTags" ADD CONSTRAINT "_GameSetToHashTags_A_fkey" FOREIGN KEY ("A") REFERENCES "game_sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameSetToHashTags" ADD CONSTRAINT "_GameSetToHashTags_B_fkey" FOREIGN KEY ("B") REFERENCES "hash_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
