import Prisma from "../database/prisma.database";

const cadastrar = async (nome: string, posicao: string, idade: number, matricula: string, id_equipe: string, imagem:string) => 
    await Prisma.jogador.create({
        data: {
            nome,
            posicao,
            idade,
            matricula,
            id_equipe,
            imagem
        }
    })

const buscarPorId = async (id: string) => await Prisma.jogador.findUnique({where: {id}})

const buscarTodos = async () => await Prisma.jogador.findMany()

export const atualizarPorId = async (id: string, data: {
    nome: string;
    posicao: string;
    idade: number;
    matricula: string;
    imagem: string;
}) => {
    return Prisma.jogador.update({
        where: { id },
        data,
    });
};

const atualizarTime = async (id: string, id_equipe: string) => {
    return await Prisma.jogador.update({
        where: { id },
        data: { id_equipe }
    });
};
    
    
const deletar = async (id: string) => await Prisma.jogador.delete({where: {id}})

const deletarPorEquipe = async (id_equipe: string) =>
  await Prisma.jogador.deleteMany({ where: { id_equipe } });

const serviceJogador = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    atualizarPorId,
    atualizarTime,
    deletar,
    deletarPorEquipe
}

export default serviceJogador