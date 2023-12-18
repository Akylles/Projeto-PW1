import express from 'express'
import routerProfessor from './routes/professor.route'
import routerTorneio from './routes/torneio.router'
import routerEquipe from './routes/equipe.router'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/professor', routerProfessor)
app.use('/torneio', routerTorneio)
app.use('/equipe', routerEquipe)

const PORTA = process.env.API_PORTA

app.listen(PORTA, () => console.log(`Aplicação rodando na porta ${PORTA}`))