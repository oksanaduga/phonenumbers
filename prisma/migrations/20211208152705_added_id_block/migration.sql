/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Phones" (
    "code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("code","phone")
);
