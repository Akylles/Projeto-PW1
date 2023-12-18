import { Request, Response, NextFunction } from "express";
import serviceEquipe from "../services/equipe.service";
import serviceJogador from "../services/jogador.service";
import serviceTorneio from "../services/torneio.service";

const permiteCadastro = async (req: Request, res: Response, next: NextFunction) => {
    const matricula = req.body.matricula
    
    const jogadores = await serviceJogador.buscarTodos()
    let erro = false

    jogadores.forEach( j => {
        if (j.matricula == matricula){
            erro = true
            return res.status(401).send({
                message: `ERRO: Já existe um jogador cadastrado com a matrícula ${matricula}`
            })
        } 
    })
    
    if(!erro){
        next()
    }
    
}

const idTemJogador = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const jogador = await serviceJogador.buscarPorId(id)
    
    if(!jogador){
        res.status(404).send({
            message: `ERRO: não existe nenhum jogador cadastrado com o id: ${id}`
        })
    }else{
        req.jogador = jogador
        next()
    }
}

const existeEquipe = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id_equipe || req.jogador.id_equipe
    const equipe = await serviceEquipe.buscarPorId(id)
    
    if(!equipe){
        res.status(404).send({
            message: `ERRO: não existe nenhum Equipe cadastrado com o id: ${id}`
        })
    }else{
        const torneio = await serviceTorneio.buscarPorId(equipe.id_torneio)
        if(!torneio){
            res.status(404).send({
                message: `ERRO: não existe nenhum torneio cadastrado com o id: ${equipe.id_torneio}`
            })  
        }else{
            req.torneio = torneio
        }
        
        req.equipe = equipe
        next()
    }
}

const autorizaProfessor = async (req: Request, res: Response, next: NextFunction) => {

    if (req.professor.id != req.torneio.id_professor){
        res.status(403).send({
            mensagem: `ERRO: Operação NÃO permitida ao professor ${req.professor.nome}`
        })
    }else{
        next()
    }
}

const middlewareJogador = {
    permiteCadastro,
    idTemJogador,
    existeEquipe,
    autorizaProfessor,
}

export default middlewareJogador