/*
  Warnings:

  - You are about to drop the column `Price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `PriceAfterDiscount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Price",
DROP COLUMN "PriceAfterDiscount",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "priceAfterDiscount" INTEGER;
