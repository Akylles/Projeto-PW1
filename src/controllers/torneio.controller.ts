import {Request, Response} from 'express'
import serviceTorneio from '../services/torneio.service'
import { unlink } from 'fs'
import path from 'path'

const cadastrar = async (req: Request, res: Response) => {
    const {descricao, data, campus, latitude, longitude} = req.body

    console.log("Recebendo no backend:", req.file);

    if (!req.file) {
        return res.status(400).json({ mensagem: "A imagem é obrigatória" });
    }

    const img_local = req.file?.filename || "NOT FOUND"
    const id_professor = req.professor?.id;

    if (!id_professor) {
        return res.status(401).send({ mensagem: "ERRO: Professor não autenticado." });
    }
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
    const id = req.params.id;

    const torneio = await serviceTorneio.buscarPorId(id);

    if (!torneio) {
        return res.status(404).json({ mensagem: "Torneio não encontrado!" });
    }

    if (torneio.img_local) {
        const caminhoImagem = path.join(path.resolve(), "uploads", torneio.img_local);

        unlink(caminhoImagem, (err) => {
            if (err) {
                console.error("Erro ao deletar imagem:", err);
            } else {
                console.log(`${caminhoImagem} foi deletado com sucesso`);
            }
        });
    }

    await serviceTorneio.deletar(id);

    res.status(200).send({
        mensagem: "Torneio deletado com sucesso!"
    });
};


const controllerTorneio = {
    cadastrar,
    buscarPorID,
    buscarTodos,
    atualizar,
    excluir
}

export default controllerTorneio