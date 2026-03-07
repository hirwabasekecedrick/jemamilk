-- CreateTable
CREATE TABLE "Features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "addedby" TEXT NOT NULL,
    "roles" "Roles"[],

    CONSTRAINT "Features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Features_name_key" ON "Features"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Features_url_key" ON "Features"("url");

-- AddForeignKey
ALTER TABLE "Features" ADD CONSTRAINT "Features_addedby_fkey" FOREIGN KEY ("addedby") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
