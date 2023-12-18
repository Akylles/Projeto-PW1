import {Request, Response} from 'express'
import serviceProfessor from '../services/professor.service.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const cadastrar = async (req: Request, res: Response) => {
    const {nome, cref, email, senha} = req.body

    const {senha:_, ...Professor} = await serviceProfessor.cadastrar(nome, cref, email, senha)

    res.status(201).send({
        mensagem: "Professor criado com sucesso",
        Professor: Professor
    })
}

const login = async (req: Request, res: Response) => {
    const senha = req.body.senha
    const hashSenha = req.professor.senha

    const autoriza = bcrypt.compareSync(senha, hashSenha)

    if(autoriza){
        const {senha:_, ...professor} = req.professor
        const senhaJWT = process.env.JWT_SENHA || ''
        const token = jwt.sign({id: professor.id}, senhaJWT, {expiresIn: '1d'})

        res.status(200).send({
            mensagem: "Login autorizado com sucesso",
            professor: professor.nome,
            token
        })
    }else{
        res.status(401).send({
            mensagem: 'ERRO: senha inválida'
        })
    }
}

const buscarPorID = async (req: Request, res: Response) => {
    const {senha:_, ...professor} = req.professor

    res.status(200).send({
        mensagem: "Professor encontrado com sucesso",
        professor: professor
    })
}

const buscarTodos = async (req: Request, res: Response) => {
    const professores = await serviceProfessor.buscarTodos()

    const todosProfessores = professores.map(
        (professor) => {
            const {senha:_, ...prof} = professor
            
            return prof
    })

    res.status(200).send(todosProfessores)
}

const atualizar = async (req: Request, res: Response) => {
    const id = req.professor.id
    const {nome, cref, email, senha} = req.body
    const {senha:_, ...professor} = await serviceProfessor.atualizarPorId(id, nome, cref, email, senha)
    
    res.status(200).send({
        mensagem: "Professor atualizado com sucesso",
        professor: {
            id: professor.id,
            nome: professor.nome,
            cref: cref,
            email: professor.email
        }
    })
}

const editarEmailSenha = async (req: Request, res: Response) => {
    const id = req.professor.id
    const {email, senha} = req.body
    const {senha:_, ...professor} = await serviceProfessor.editarEmailSenha(id, email, senha)
    
    res.status(200).send({
        mensagem: "Professor atualizado com sucesso",
        professor: {
            id: professor.id,
            nome: professor.nome,
            cref: professor.cref,
            email: professor.email
        }
    })
}

const excluir = async (req: Request, res: Response) => {
    const id = req.professor.id
    const {senha:_, ...professor} = await serviceProfessor.deletar(id)
    
    res.status(200).send({
        mensagem: "Professor deletado com sucesso",
        professor: {
            id: professor.id,
            nome: professor.nome,
            email: professor.email
        }
    })
}


const controllerProfessor = {
    cadastrar,
    login,
    buscarPorID,
    buscarTodos,
    atualizar,
    editarEmailSenha,
    excluir
}

export default controllerProfessor