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

    
const deletar = async (id: string) => await Prisma.jogador.delete({where: {id}})


const serviceJogador = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    atualizarPorId,
    deletar
}

export default serviceJogador