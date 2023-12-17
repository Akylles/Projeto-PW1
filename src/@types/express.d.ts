import { Professor } from "@prisma/client"

declare global{
    namespace Express{
        export interface Request{
            professor: Professor
        }
    }
}