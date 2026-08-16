-- CreateEnum
CREATE TYPE "OrderSource" AS ENUM ('SHOP', 'DIRECT');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CHEQUE', 'CREDIT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('RECEIVED', 'IN_PROGRESS', 'READY', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "RepairOrder" (
    "id" TEXT NOT NULL,
    "labNo" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "companyName" TEXT,
    "address" TEXT,
    "contactNo" TEXT NOT NULL,
    "source" "OrderSource" NOT NULL DEFAULT 'SHOP',
    "preferredPayment" "PaymentMethod" NOT NULL DEFAULT 'CREDIT',
    "brand" TEXT NOT NULL,
    "deviceModel" TEXT NOT NULL,
    "relatedFault" TEXT,
    "serialImei" TEXT,
    "passwordProtected" BOOLEAN NOT NULL DEFAULT false,
    "devicePassword" TEXT,
    "quoted" BOOLEAN NOT NULL DEFAULT false,
    "quotedAmount" INTEGER,
    "faultDescription" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'RECEIVED',
    "cost" INTEGER,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "amountPaid" INTEGER DEFAULT 0,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepairOrder_labNo_key" ON "RepairOrder"("labNo");

-- CreateIndex
CREATE INDEX "RepairOrder_status_createdAt_idx" ON "RepairOrder"("status", "createdAt");

-- CreateIndex
CREATE INDEX "RepairOrder_source_idx" ON "RepairOrder"("source");

-- CreateIndex
CREATE INDEX "RepairOrder_preferredPayment_idx" ON "RepairOrder"("preferredPayment");

-- CreateIndex
CREATE INDEX "RepairOrder_paymentStatus_idx" ON "RepairOrder"("paymentStatus");

-- CreateIndex
CREATE INDEX "RepairOrder_createdAt_idx" ON "RepairOrder"("createdAt");
