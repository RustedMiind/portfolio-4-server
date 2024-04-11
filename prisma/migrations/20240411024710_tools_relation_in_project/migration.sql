-- CreateTable
CREATE TABLE "_ProjectToTool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTool_AB_unique" ON "_ProjectToTool"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTool_B_index" ON "_ProjectToTool"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToTool" ADD CONSTRAINT "_ProjectToTool_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTool" ADD CONSTRAINT "_ProjectToTool_B_fkey" FOREIGN KEY ("B") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
