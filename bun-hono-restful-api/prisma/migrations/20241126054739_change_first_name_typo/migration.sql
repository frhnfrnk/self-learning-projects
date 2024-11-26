/*
  Warnings:

  - You are about to drop the column `fist_name` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `fist_name`,
    ADD COLUMN `first_name` VARCHAR(100) NOT NULL;
