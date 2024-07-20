-- CreateTable
CREATE TABLE "Center" (
    "uuid" TEXT NOT NULL,
    "center_code" TEXT,
    "branch_name" TEXT,
    "ifsc" TEXT,
    "center_incharge" TEXT,

    CONSTRAINT "Center_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Employee" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "govt_id" TEXT NOT NULL,
    "roles" TEXT[],
    "centerUuid" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Client" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spouse" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "house_type" TEXT NOT NULL,
    "house_status" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "residence_customer_year" INTEGER NOT NULL,
    "agentUuid" TEXT NOT NULL,
    "guarantorUuid" TEXT NOT NULL,
    "centerUuid" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Guarantor" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spouse" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "house_status" TEXT NOT NULL,

    CONSTRAINT "Guarantor_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "BankDetails" (
    "uuid" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Family" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "occupation" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "clientUuid" TEXT NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "HouseHoldDetails" (
    "uuid" TEXT NOT NULL,
    "loan" DOUBLE PRECISION NOT NULL,
    "education" DOUBLE PRECISION NOT NULL,
    "medical" DOUBLE PRECISION NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,
    "others" DOUBLE PRECISION NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expense" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HouseHoldDetails_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Documents" (
    "uuid" TEXT NOT NULL,
    "smart_card" TEXT NOT NULL,
    "aadhar_card" TEXT NOT NULL,
    "voter_id_card" TEXT NOT NULL,
    "pan_card" TEXT NOT NULL,
    "optional" TEXT NOT NULL,
    "clientUuid" TEXT,
    "guarantorUuid" TEXT,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_centerUuid_fkey" FOREIGN KEY ("centerUuid") REFERENCES "Center"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_agentUuid_fkey" FOREIGN KEY ("agentUuid") REFERENCES "Employee"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_guarantorUuid_fkey" FOREIGN KEY ("guarantorUuid") REFERENCES "Guarantor"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_centerUuid_fkey" FOREIGN KEY ("centerUuid") REFERENCES "Center"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Client"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_clientUuid_fkey" FOREIGN KEY ("clientUuid") REFERENCES "Client"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseHoldDetails" ADD CONSTRAINT "HouseHoldDetails_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Client"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_clientUuid_fkey" FOREIGN KEY ("clientUuid") REFERENCES "Client"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_guarantorUuid_fkey" FOREIGN KEY ("guarantorUuid") REFERENCES "Guarantor"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
