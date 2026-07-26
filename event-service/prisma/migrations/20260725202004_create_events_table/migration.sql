-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "venue" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "ticketPrice" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "seatsAvailable" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
