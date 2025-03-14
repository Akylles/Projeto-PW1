import Prisma from "../database/prisma.database";
import bcrypt from "bcrypt";

const cadastrar = async (nome: string, cref: string, email: string, senha: string) => {
    try {
        // Verificando se o email já está cadastrado
        const usuarioExistente = await Prisma.professor.findUnique({
            where: { email },
        });

        if (usuarioExistente) {
            throw new Error("Email já cadastrado");
        }

        // Gerando o hash da senha
        const senhaHash = await bcrypt.hash(senha, 8);

        // Criando o professor no banco de dados
        const usuario = await Prisma.professor.create({
            data: {
                nome: nome,
                cref: cref,
                email: email,
                senha: senhaHash,
            },
        });

        return usuario;
    } catch (error: any) { // Tipando o erro como 'any'
        throw new Error(`Erro ao cadastrar o professor: ${error.message}`);
    }
};


const buscarPorId = async (id: string) => await Prisma.professor.findUnique({
    where: {
        id: parseInt(id), // Converte o id de string para número
    },
    select: {
        id: true,
        nome: true,
        cref: true,
        email: true,
        senha: true,
    }
});

const buscarPorEmail = async (email: string) => await Prisma.professor.findUnique({
    where: {
        email: email
    }
});

const buscarTodos = async () => await Prisma.professor.findMany();

const atualizarPorId = async (id: string, nome: string, cref: string, email: string, senha: string) => {
    const dadosAtualizacao: any = {};

    if (nome) dadosAtualizacao.nome = nome;
    if (cref) dadosAtualizacao.cref = cref;
    if (email) dadosAtualizacao.email = email;

    if (senha) {
        const saltRounds = 12;
        dadosAtualizacao.senha = await bcrypt.hash(senha, saltRounds);
    }

    const professorAtualizado = await Prisma.professor.update({
        where: { id: parseInt(id) }, // Converte o id de string para número
        data: dadosAtualizacao,
    });

    return professorAtualizado;
}

const editarEmailSenha = async (id: string, email: string, senha: string) => {
    const senhaHash = await bcrypt.hash(senha, 8)

    const professor = await Prisma.professor.update({
        where: { id: parseInt(id) }, // Converte o id de string para número
        data: {
            email,
            senha: senhaHash
        }
    })

    return professor
}

const deletar = async (id: string) => await Prisma.professor.delete({
    where: { id: parseInt(id) } // Converte o id de string para número
});

const serviceProf = {
    cadastrar,
    buscarPorId,
    buscarTodos,
    buscarPorEmail,
    atualizarPorId,
    editarEmailSenha,
    deletar
}

export default serviceProf;
