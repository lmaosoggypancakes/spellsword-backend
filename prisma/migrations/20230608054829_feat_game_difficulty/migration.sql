-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('CASUAL', 'ADVENTURE', 'MASTER');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'ADVENTURE';
