import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";


const validaUUID = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    
    if (validate(id)){
        next()
    }else{
        res.status(400).send({
            mensagem: "ERRO: ID inválido passado na requisição."
        })
    }
    
}

const middlewareGlobal = {
    validaUUID
}

export default middlewareGlobal