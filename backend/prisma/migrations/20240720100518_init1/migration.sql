-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_centerUuid_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "centerUuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_centerUuid_fkey" FOREIGN KEY ("centerUuid") REFERENCES "Center"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
