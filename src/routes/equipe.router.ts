import express from 'express'
import middlewareAuth from '../middleware/auth.middleware'
import middlewareGlobal from '../middleware/global.middleware'
import middlewareEquipe from '../middleware/equipe.middleware'
import controllerEquipe from '../controllers/equipe.controller'

const routerEquipe = express.Router()

routerEquipe.post('/', 
                    middlewareEquipe.permiteCadastro, 
                    middlewareAuth.autenticacao, 
                    middlewareEquipe.existeTorneio,
                    middlewareEquipe.professorPossuiTorneio,
                    controllerEquipe.cadastrar)

routerEquipe.get('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareEquipe.idTemEquipe, 
                    controllerEquipe.buscarPorID)

routerEquipe.get('/', controllerEquipe.buscarTodos)

routerEquipe.put('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareEquipe.idTemEquipe,
                    middlewareAuth.autenticacao, 
                    middlewareEquipe.existeTorneio,
                    middlewareEquipe.professorPossuiTorneio,
                    middlewareEquipe.autorizaProfessor, 
                    controllerEquipe.atualizar)

routerEquipe.delete('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareEquipe.idTemEquipe, 
                    middlewareAuth.autenticacao, 
                    middlewareEquipe.autorizaProfessor, 
                    controllerEquipe.excluir)

export default routerEquipe