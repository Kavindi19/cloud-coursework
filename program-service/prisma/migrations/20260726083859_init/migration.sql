-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "speakerName" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);
