import express from 'express'
import routerProfessor from './routes/professor.route'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/professor', routerProfessor)

const PORTA = process.env.API_PORTA

app.listen(PORTA, () => console.log(`Aplicação rodando na porta ${PORTA}`))