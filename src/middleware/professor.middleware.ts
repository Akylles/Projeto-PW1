import { Request, Response, NextFunction } from "express";
import serviceProf from "../services/professor.service";
import 'dotenv/config'

const permiteCadastro = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email
    const professor = await serviceProf.buscarPorEmail(email)

    if(professor){
        res.status(401).send({
            message: `Não autorizado. Já existe um professor cadastrado com o email: ${email}`
        })
    }else{
        next()
    }
}

const professorExiste = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email
    const professor = await serviceProf.buscarPorEmail(email)    

    if(!professor){
        res.status(404).send({
            mensagem: "ERRO: professor de educação física não encontrado"
        })
    }else{
        req.professor = professor
        next()
    }
}


const idTemProfessor = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const professor = await serviceProf.buscarPorId(id)
    
    if(!professor){
        res.status(404).send({
            message: `ERRO: não existe professor cadastrado com o id: ${id}`
        })
    }else{
        req.professor = professor
        next()
    }
}


const middlewareProfessor = {
    permiteCadastro,
    professorExiste,
    idTemProfessor
}

export default middlewareProfessor