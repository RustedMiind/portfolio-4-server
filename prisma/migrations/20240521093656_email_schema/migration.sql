-- CreateTable
CREATE TABLE "Mails" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender_name" TEXT NOT NULL,
    "sender_email" TEXT NOT NULL,
    "org_name" TEXT,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Mails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mails_id_key" ON "Mails"("id");
