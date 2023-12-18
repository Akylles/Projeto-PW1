import Prisma from "../database/prisma.database";

const cadastrar = async (descricao: string, data: string, campus: string, 
    img_local: string, latitude: number, longitude: number, id_professor: string) => {
    
    const torneio = await Prisma.torneio.create({
        data: {
            descricao,
            data: new Date(data),
            campus,
            img_local,
            latitude,
            longitude,
            id_professor
        }
    })

    return torneio
}

const buscarPorId = async (id: string) => await Prisma.torneio.findUnique({ 
    where: {
        id: id}
    })


const buscarTodos = async () => await Prisma.torneio.findMany()

const atualizarPorId = async (id: string, descricao: string, data: string, campus: string, 
    img_local: string, latitude: number, longitude: number) => {
    
    const professor = await Prisma.torneio.update({
        where: {id},
        data: {
            descricao, 
            data: new Date(data), 
            campus, 
            img_local, 
            latitude, 
            longitude,
        }
    })

    return professor
}

const deletar = async (id: string) => await Prisma.torneio.delete({where: {id}})


const serviceTorneio = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    atualizarPorId,
    deletar
}

export default serviceTorneio