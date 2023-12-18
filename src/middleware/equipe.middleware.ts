import { Request, Response, NextFunction } from "express";
import serviceEquipe from "../services/equipe.service";
import serviceTorneio from "../services/torneio.service";

const permiteCadastro = async (req: Request, res: Response, next: NextFunction) => {
    const nome = req.body.nome
    
    const equipes = await serviceEquipe.buscarTodos()
    let erro = false

    equipes.forEach( e => {
        if (e.nome == nome){
            erro = true
            return res.status(401).send({
                message: `ERRO: Já existe uma equipe cadastrada com o nome ${nome}`
            })
        } 
    })
    
    if(!erro){
        next()
    }
    
}

const autorizaProfessor = async (req: Request, res: Response, next: NextFunction) => {
    const id_professor = req.professor.id
    const id_torneio_equipe = req.equipe.id_torneio
    
    const torneio = await serviceTorneio.buscarPorId(id_torneio_equipe)
    
    if(!torneio){
        return res.status(403).send({
            mensagem: `ERRO: Operação NÃO permitida ao professor ${req.professor.nome}`
        })
    }

    if (id_professor != torneio.id_professor){
        res.status(403).send({
            mensagem: `ERRO: Operação NÃO permitida ao professor ${req.professor.nome}`
        })
    }else{
        next()
    }
}

const idTemEquipe = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const equipe = await serviceEquipe.buscarPorId(id)
    
    if(!equipe){
        res.status(404).send({
            message: `ERRO: não existe nenhuma equipe cadastrada com o id: ${id}`
        })
    }else{
        req.equipe = equipe
        next()
    }
}

const existeTorneio = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id_torneio
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


const professorPossuiTorneio = async (req: Request, res: Response, next: NextFunction) => {
    
    const torneio = req.torneio
    
    if(torneio.id_professor == req.professor.id){
        next()
    }else{
        res.status(404).send({
            message: `ERRO: o professor "${req.professor.nome}" não possui permissões sobre torneio ${torneio.descricao}}`
        })
    }
}

const middlewareEquipe = {
    permiteCadastro,
    idTemEquipe,
    existeTorneio,
    autorizaProfessor,
    professorPossuiTorneio
}

export default middlewareEquipe