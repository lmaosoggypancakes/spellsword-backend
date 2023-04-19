/*
  Warnings:

  - You are about to drop the column `defintion` on the `Move` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "GameStatus" ADD VALUE 'DRAW';

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "defintion",
ADD COLUMN     "definition" TEXT;
