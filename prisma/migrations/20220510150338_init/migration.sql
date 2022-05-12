-- CreateTable
CREATE TABLE "Folder" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR NOT NULL,
    "parentFolderId" VARCHAR(36),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR NOT NULL,
    "parentFolderId" VARCHAR(36) NOT NULL,
    "content" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
