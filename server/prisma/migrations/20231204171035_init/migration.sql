-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "dateBirth" DROP NOT NULL,
ALTER COLUMN "language" SET DEFAULT 'russian';
