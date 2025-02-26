/*
  Warnings:

  - Added the required column `service` to the `Appointmints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointmints" ADD COLUMN     "service" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
