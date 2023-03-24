-- CreateTable
CREATE TABLE "academia" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "body" TEXT,

    CONSTRAINT "academia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firehose_Items" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "postdate" TIMESTAMP(3) NOT NULL,
    "source" TEXT,

    CONSTRAINT "firehose_Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "firehose_Items_url_key" ON "firehose_Items"("url");
