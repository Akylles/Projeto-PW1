import Prisma from "../database/prisma.database";

const cadastrar = async (nome: string, posicao: string, idade: number, matricula: string, id_equipe: string) => 
    await Prisma.jogador.create({
        data: {
            nome,
            posicao,
            idade,
            matricula,
            id_equipe
        }
    })

const buscarPorId = async (id: string) => await Prisma.jogador.findUnique({where: {id}})

const buscarTodos = async () => await Prisma.jogador.findMany()

const atualizarPorId = async (id: string, nome: string, posicao: string, idade: number, matricula: string) => 
    await Prisma.jogador.update({
        where: {id},
        data: {nome, posicao, idade, matricula}
    })


const atualizarTime = async (id: string, id_equipe: string) => {
    return await Prisma.jogador.update({
        where: { id },
        data: { id_equipe }
    });
};
    
    
const deletar = async (id: string) => await Prisma.jogador.delete({where: {id}})


const serviceJogador = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    atualizarPorId,
    atualizarTime,
    deletar
}

export default serviceJogador