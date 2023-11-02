/*
  Warnings:

  - You are about to alter the column `upload_type` on the `uploads` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `uploads` MODIFY `upload_type` ENUM('image', 'video') NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `user` MODIFY `image` VARCHAR(255) NULL DEFAULT '/uploads/default.png';
