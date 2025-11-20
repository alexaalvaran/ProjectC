/*
  Warnings:

  - Added the required column `rating` to the `Resto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resto" ADD COLUMN     "rating" INTEGER NOT NULL;
