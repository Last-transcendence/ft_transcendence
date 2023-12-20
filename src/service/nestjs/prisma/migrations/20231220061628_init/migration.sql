/*
  Warnings:

  - The `visibility` column on the `Channel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mode` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `result` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'OFFLINE', 'PLAYING');

-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('NORMAL', 'HARD', 'RANK');

-- CreateEnum
CREATE TYPE "GameResult" AS ENUM ('PENDING', 'WIN', 'LOSE', 'DRAW');

-- CreateEnum
CREATE TYPE "ChannelVisibility" AS ENUM ('PUBLIC', 'PROTECTED', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ParticipantRole" AS ENUM ('OWNER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "visibility",
ADD COLUMN     "visibility" "ChannelVisibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "mode",
ADD COLUMN     "mode" "GameMode" NOT NULL DEFAULT 'NORMAL',
DROP COLUMN "result",
ADD COLUMN     "result" "GameResult" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "role",
ADD COLUMN     "role" "ParticipantRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'OFFLINE';

-- CreateIndex
CREATE INDEX "blockUserId" ON "Block"("userId");

-- CreateIndex
CREATE INDEX "friendUserId" ON "Friend"("userId");

-- CreateIndex
CREATE INDEX "player1Id" ON "Game"("player1Id");

-- CreateIndex
CREATE INDEX "intraId" ON "User"("intraId");
