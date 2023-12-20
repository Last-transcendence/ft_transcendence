-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "intraId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profileImageURI" TEXT NOT NULL,
    "email2fa" TEXT NOT NULL,
    "use2fa" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'online',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_intraId_key" ON "User"("intraId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email2fa_key" ON "User"("email2fa");
