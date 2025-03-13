import {Request, Response} from 'express'
import serviceJogador from '../services/jogador.service'

const cadastrar = async (req: Request, res: Response) => {
    const {nome, posicao, idade, matricula, id_equipe} = req.body
    const imagem  = req.file?.filename || "NOT FOUND";

    const equipe = await serviceJogador.cadastrar(nome, posicao, idade, matricula, id_equipe, imagem)

    res.status(201).send({
        mensagem: "Jogador criado com sucesso",
        equipe
    })
}

const buscarPorID = async (req: Request, res: Response) => {
    const jogador = req.jogador

    res.status(200).send({
        mensagem: "Jogador encontrado com sucesso",
        jogador
    })
}

const buscarTodos = async (req: Request, res: Response) => {
    const jogadores = await serviceJogador.buscarTodos()

    res.status(200).send(jogadores)
}

const atualizar = async (req: Request, res: Response) => {
    const id = req.params.id
    const {nome, posicao, idade, matricula, id_equipe} = req.body
    const imagem  = req.file?.filename || "NOT FOUND";

    const jogador = await serviceJogador.atualizarPorId(id, nome, posicao, idade, matricula, imagem)

    res.status(200).send({
        mensagem: "Jogador atualizado com sucesso",
        jogador
    })
}


const excluir = async (req: Request, res: Response) => {
    const id = req.params.id
    const jogador = await serviceJogador.deletar(id)

    res.status(200).send({
        mensagem: "Jogador deletado com sucesso",
        jogador
    })
}


const transferir = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { id_equipe } = req.body;

    if (!id_equipe) {
        return res.status(400).send({ mensagem: "O campo 'id_equipe' é obrigatório." });
    }

    try {
        const jogador = await serviceJogador.atualizarTime(id, id_equipe);
        res.status(200).send({
            mensagem: "Jogador transferido com sucesso",
            jogador
        });
    } catch (error) {
        res.status(500).send({
            mensagem: "Erro ao transferir jogador",
            error
        });
    }
};


const controllerJogador = {
    cadastrar,
    buscarPorID,
    buscarTodos,
    atualizar,
    transferir,
    excluir
}

export default controllerJogador