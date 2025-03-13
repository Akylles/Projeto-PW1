import express from 'express'
import controllerProfessor from '../controllers/professor.controller'
import middlewareProfessor from '../middleware/professor.middleware'
import middlewareAuth from '../middleware/auth.middleware'
import middlewareGlobal from '../middleware/global.middleware'
import { upload } from '../middleware/upload'

const routerProfessor = express.Router()

routerProfessor.post('/', upload.single('imagem'), middlewareProfessor.permiteCadastro, controllerProfessor.cadastrar)
routerProfessor.post('/login', middlewareProfessor.professorExiste, controllerProfessor.login)
routerProfessor.get('/:id', middlewareGlobal.validaUUID, middlewareProfessor.idTemProfessor, controllerProfessor.buscarPorID)
routerProfessor.get('/', controllerProfessor.buscarTodos)
routerProfessor.put('/', upload.single('imagem'), middlewareAuth.autenticacao, controllerProfessor.atualizar)
routerProfessor.patch('/', middlewareAuth.autenticacao, controllerProfessor.editarEmailSenha)
routerProfessor.delete('/', middlewareAuth.autenticacao, controllerProfessor.excluir)

export default routerProfessor