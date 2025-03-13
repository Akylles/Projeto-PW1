import express from 'express'
import middlewareAuth from '../middleware/auth.middleware'
import middlewareGlobal from '../middleware/global.middleware'
import middlewareJogador from '../middleware/jogador.middleware'
import controllerJogador from '../controllers/jogador.controller'
import { upload } from '../middleware/upload'

const routerJogador = express.Router()

routerJogador.post('/', 
                    upload.single('imagem'),
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
                    upload.single('imagem'),
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

routerJogador.patch('/:id/transferir',
                    middlewareGlobal.validaUUID,
                    middlewareJogador.idTemJogador,
                    middlewareAuth.autenticacao,
                    middlewareJogador.existeEquipe,
                    middlewareJogador.autorizaProfessor,
                    controllerJogador.transferir)
                                        
export default routerJogador