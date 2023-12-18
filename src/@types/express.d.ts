import { Equipe, Professor, Torneio } from "@prisma/client"

declare global{
    namespace Express{
        export interface Request{
            professor: Professor,
            torneio: Torneio,
            equipe: Equipe
        }
    }
}