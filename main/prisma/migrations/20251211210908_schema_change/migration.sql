/*
  Warnings:

  - You are about to drop the column `creatorId` on the `event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_creatorId_fkey";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "creatorId";
