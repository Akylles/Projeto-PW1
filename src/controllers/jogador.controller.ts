import {Request, Response} from 'express'
import serviceJogador from '../services/jogador.service'

const cadastrar = async (req: Request, res: Response) => {
    const {nome, posicao, idade, matricula, id_equipe} = req.body

    const equipe = await serviceJogador.cadastrar(nome, posicao, idade, matricula, id_equipe)

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

    const jogador = await serviceJogador.atualizarPorId(id, nome, posicao, idade, matricula)

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


const controllerJogador = {
    cadastrar,
    buscarPorID,
    buscarTodos,
    atualizar,
    excluir
}

export default controllerJogador