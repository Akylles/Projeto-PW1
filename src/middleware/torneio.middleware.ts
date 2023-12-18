import { Request, Response, NextFunction } from "express";
import serviceTorneio from "../services/torneio.service";
import 'dotenv/config'

const permiteCadastro = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body.data
    const campus = req.body.campus

    const torneios = await serviceTorneio.buscarTodos()
    let erro = false

    torneios.forEach((torn)=> {
        if (torn.campus == campus && torn.data.getTime() == new Date(data).getTime()){
            erro = true
            return res.status(401).send({
                message: `ERRO: Já existe um torneio a ser realizado no campus ${campus} na data ${data}`
            })
        } 
    })
    
    if(!erro){
        next()
    }
    
}

const autorizaProfessor = async (req: Request, res: Response, next: NextFunction) => {
    const id_professor_torneio = req.torneio.id_professor
    const id_professor = req.professor.id

    if (id_professor != id_professor_torneio){
        res.status(403).send({
            mensagem: `ERRO: Operação NÃO permitida ao professor ${req.professor.nome}`
        })
    }else{
        next()
    }
}

const idTemTorneio = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const torneio = await serviceTorneio.buscarPorId(id)
    
    if(!torneio){
        res.status(404).send({
            message: `ERRO: não existe nenhum torneio cadastrado com o id: ${id}`
        })
    }else{
        req.torneio = torneio
        next()
    }
}


const middlewareTorneio = {
    permiteCadastro,
    idTemTorneio,
    autorizaProfessor
}

export default middlewareTorneio