-- CreateTable
CREATE TABLE "professor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cref" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torneio" (
    "id" TEXT NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "campus" TEXT NOT NULL,
    "img_local" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "id_professor" TEXT NOT NULL,

    CONSTRAINT "torneio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipe" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "lema" TEXT,
    "id_torneio" TEXT NOT NULL,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jogador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "matricula" TEXT NOT NULL,
    "id_equipe" TEXT NOT NULL,

    CONSTRAINT "jogador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_key" ON "professor"("email");

-- AddForeignKey
ALTER TABLE "torneio" ADD CONSTRAINT "torneio_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipe" ADD CONSTRAINT "equipe_id_torneio_fkey" FOREIGN KEY ("id_torneio") REFERENCES "torneio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jogador" ADD CONSTRAINT "jogador_id_equipe_fkey" FOREIGN KEY ("id_equipe") REFERENCES "equipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
