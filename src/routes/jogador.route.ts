import express from 'express'
import middlewareAuth from '../middleware/auth.middleware'
import middlewareGlobal from '../middleware/global.middleware'
import middlewareJogador from '../middleware/jogador.middleware'
import controllerJogador from '../controllers/jogador.controller'

const routerJogador = express.Router()

routerJogador.post('/', 
                    middlewareJogador.permiteCadastro, 
                    middlewareAuth.autenticacao, 
                    middlewareJogador.existeEquipe,
                    middlewareJogador.autorizaProfessor,
                    controllerJogador.cadastrar)

routerJogador.get('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareJogador.idTemJogador, 
                    controllerJogador.buscarPorID)

routerJogador.get('/', controllerJogador.buscarTodos)

routerJogador.put('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareJogador.idTemJogador,
                    middlewareAuth.autenticacao, 
                    middlewareJogador.existeEquipe,
                    middlewareJogador.autorizaProfessor, 
                    controllerJogador.atualizar)

routerJogador.delete('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareJogador.idTemJogador,
                    middlewareAuth.autenticacao, 
                    middlewareJogador.existeEquipe,
                    middlewareJogador.autorizaProfessor, 
                    controllerJogador.excluir)

export default routerJogador