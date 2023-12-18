import {Request, Response} from 'express'
import serviceEquipe from '../services/equipe.service'

const cadastrar = async (req: Request, res: Response) => {
    const {nome, lema, id_torneio} = req.body

    const equipe = await serviceEquipe.cadastrar(nome, lema, id_torneio)

    res.status(201).send({
        mensagem: "Equipe criada com sucesso",
        equipe
    })
}

const buscarPorID = async (req: Request, res: Response) => {
    const equipe = req.equipe

    res.status(200).send({
        mensagem: "Equipe encontrada com sucesso",
        equipe
    })
}

const buscarTodos = async (req: Request, res: Response) => {
    const torneios = await serviceEquipe.buscarTodos()

    res.status(200).send(torneios)
}

const atualizar = async (req: Request, res: Response) => {
    const id = req.params.id
    const {nome, lema} = req.body

    const equipe = await serviceEquipe.atualizarPorId(id, nome, lema)

    res.status(200).send({
        mensagem: "Equipe atualizado com sucesso",
        equipe
    })
}


const excluir = async (req: Request, res: Response) => {
    const id = req.params.id
    const equipe = await serviceEquipe.deletar(id)

    res.status(200).send({
        mensagem: "Equipe deletada com sucesso",
        equipe
    })
}


const controllerEquipe = {
    cadastrar,
    buscarPorID,
    buscarTodos,
    atualizar,
    excluir
}

export default controllerEquipe