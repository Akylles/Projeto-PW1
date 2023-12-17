import { Request, Response, NextFunction } from "express";
import serviceProf from "../services/professor.service";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

type PayloadJWT = {
    id: string
}

const autenticacao = async (req: Request, res: Response, next: NextFunction) => {
    const autorizacao = req.headers.authorization

    if(!autorizacao){
        return res.status(401).send({
            mensagem: "ERRO: O token de autorização não foi passado"
        })
    }

    const token = autorizacao.split(' ')[1]
    const senhaJWT = process.env.JWT_SENHA || ''

    try {
        const payload = jwt.verify(token, senhaJWT) as PayloadJWT    
        const professor = await serviceProf.buscarPorId(payload.id)
    
        if(!professor){
            return res.status(401).send({
                mensagem: "ERRO: token inválido"
            })
        }
        
        req.professor = professor
        next()
    } catch (error) {
        console.log(error)
        
        return res.status(500).send({
            mensagem: "ERRO: o servidor se deparou com uma situação com a qual não sabe lidar",
            erro: error
        })
    }
    
}


const middlewareAuth = {
    autenticacao
}

export default middlewareAuth