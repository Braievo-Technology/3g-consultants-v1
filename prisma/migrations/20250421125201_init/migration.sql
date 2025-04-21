/*
  Warnings:

  - You are about to drop the `JobApplicationSkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `skills` to the `JobApplications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `JobApplicationSkills` DROP FOREIGN KEY `JobApplicationSkills_applicationId_fkey`;

-- AlterTable
ALTER TABLE `JobApplications` ADD COLUMN `skills` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `JobApplicationSkills`;
