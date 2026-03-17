/*
  Warnings:

  - A unique constraint covering the columns `[userId,orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_orderNumber_key" ON "Order"("userId", "orderNumber");
