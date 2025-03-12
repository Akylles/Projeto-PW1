import Prisma from "../database/prisma.database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
            professor: { connect: { id: id_professor } } 
        }
    })

    return torneio
}

export const buscarPorId = async (id: string) => {
    if (!id) {
        throw new Error("Erro: ID do torneio não pode ser undefined!");
    }

    return prisma.torneio.findUnique({
        where: { id },
    });
};

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

export const deletar = async (id: string) => {
  try {
    await prisma.equipe.deleteMany({
      where: {
        id_torneio: id,
      },
    });

    await prisma.torneio.delete({
      where: { id },
    });

    return { mensagem: "Torneio deletado com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar torneio:", error);
    throw new Error("Não foi possível excluir o torneio. Verifique se ele não tem dependências.");
  }
};


const serviceTorneio = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    atualizarPorId,
    deletar
}

export default serviceTorneio