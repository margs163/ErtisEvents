/*
  Warnings:

  - Made the column `description` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "img" SET NOT NULL;
