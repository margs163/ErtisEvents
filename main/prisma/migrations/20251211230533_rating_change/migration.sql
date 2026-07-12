/*
  Warnings:

  - Made the column `rating` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "rating" SET NOT NULL;
