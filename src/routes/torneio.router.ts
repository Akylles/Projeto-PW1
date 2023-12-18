import express from 'express'
import multer from 'multer'
import armazenamento from '../config/multer.config'
import middlewareTorneio from '../middleware/torneio.middleware'
import middlewareAuth from '../middleware/auth.middleware'
import middlewareGlobal from '../middleware/global.middleware'
import controllerTorneio from '../controllers/torneio.controller'

const upload = multer({storage: armazenamento})

const routerTorneio = express.Router()

routerTorneio.post('/', 
                    upload.single('img_local'), 
                    middlewareTorneio.permiteCadastro, 
                    middlewareAuth.autenticacao, 
                    controllerTorneio.cadastrar)

routerTorneio.get('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareTorneio.idTemTorneio, 
                    controllerTorneio.buscarPorID)

routerTorneio.get('/', controllerTorneio.buscarTodos)

routerTorneio.put('/:id', 
                    upload.single('img_local'),
                    middlewareGlobal.validaUUID, 
                    middlewareTorneio.idTemTorneio, 
                    middlewareAuth.autenticacao, 
                    middlewareTorneio.autorizaProfessor, 
                    controllerTorneio.atualizar)

routerTorneio.delete('/:id', 
                    middlewareGlobal.validaUUID, 
                    middlewareTorneio.idTemTorneio, 
                    middlewareAuth.autenticacao, 
                    middlewareTorneio.autorizaProfessor, 
                    controllerTorneio.excluir)

export default routerTorneio