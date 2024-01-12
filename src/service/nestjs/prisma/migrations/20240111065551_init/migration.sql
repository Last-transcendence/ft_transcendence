/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `Mute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Mute` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Mute_channelId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Mute_channelId_key" ON "Mute"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "Mute_userId_key" ON "Mute"("userId");
