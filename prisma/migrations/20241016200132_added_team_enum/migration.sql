-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('TEAM', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'TEAM';
