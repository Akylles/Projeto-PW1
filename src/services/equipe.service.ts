import Prisma from "../database/prisma.database";

const cadastrar = async (nome: string, lema: string, id_torneio: string) => 
    await Prisma.equipe.create({
        data: {
            nome,
            lema,
            id_torneio
        }
    })


const buscarPorId = async (id: string) => await Prisma.equipe.findUnique({where: {id}})

const buscarTodos = async () => await Prisma.equipe.findMany()

const atualizarPorId = async (id: string, nome: string, lema: string) => 
    await Prisma.equipe.update({
        where: {id},
        data: {nome, lema}
    })

    
const deletar = async (id: string) => await Prisma.equipe.delete({where: {id}})


const serviceEquipe = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    atualizarPorId,
    deletar
}

export default serviceEquipe