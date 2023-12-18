import {Request, Response} from 'express'
import serviceTorneio from '../services/torneio.service'
import { unlink } from 'fs'
import path from 'path'

const cadastrar = async (req: Request, res: Response) => {
    const {descricao, data, campus, latitude, longitude} = req.body
    const img_local = req.file?.filename || "NOT FOUND"
    const id_professor = req.professor.id

    const torneio = await serviceTorneio.cadastrar(descricao, data, campus, img_local, Number(latitude), Number(longitude), id_professor)

    res.status(201).send({
        mensagem: "Torneio criado com sucesso",
        torneio
    })
}

const buscarPorID = async (req: Request, res: Response) => {
    const torneio = req.torneio
    const caminhoImagem = path.join(path.resolve(), "uploads", torneio.img_local)

    res.status(200).send({
        mensagem: "Torneio encontrado com sucesso",
        torneio: {
            ...torneio,
            data: torneio.data.toLocaleString('pt-BR', { timeZone: 'UTC' }),
            img_local: caminhoImagem
        }
    })
}

const buscarTodos = async (req: Request, res: Response) => {
    const torneios = await serviceTorneio.buscarTodos()

    res.status(200).send(torneios)
}

const atualizar = async (req: Request, res: Response) => {
    const id = req.params.id
    const {descricao, data, campus, latitude, longitude} = req.body
    const img_local = req.file?.filename || "NOT FOUND"

    const torneio = await serviceTorneio.atualizarPorId(id, descricao, data, campus, img_local, latitude, longitude)

    res.status(200).send({
        mensagem: "Torneio atualizado com sucesso",
        torneio
    })
}


const excluir = async (req: Request, res: Response) => {
    const id = req.params.id
    const torneio = await serviceTorneio.deletar(id)

    const caminhoImagem = path.join(path.resolve(), "uploads", torneio.img_local)
    
    unlink(caminhoImagem, (err) => {
        if (err) throw err;
        console.log(`${caminhoImagem} foi deletado com sucesso`);
    });

    res.status(200).send({
        mensagem: "Torneio deletado com sucesso",
        torneio
    })
}


const controllerTorneio = {
    cadastrar,
    buscarPorID,
    buscarTodos,
    atualizar,
    excluir
}

export default controllerTorneio