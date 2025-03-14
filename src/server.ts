import express from 'express'
import routerProfessor from './routes/professor.route'
import routerTorneio from './routes/torneio.router'
import routerEquipe from './routes/equipe.router'
import routerJogador from './routes/jogador.route'
import cors from 'cors';
import path from 'path';
import 'dotenv/config'

const app = express();

app.use(
    '/uploads',
    express.static(path.join(__dirname, '..', 'uploads'))
  );

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/professor', routerProfessor)
app.use('/torneio', routerTorneio)
app.use('/equipe', routerEquipe)
app.use('/jogador', routerJogador)

const PORTA = process.env.API_PORTA || 3000

app.listen(PORTA, () => console.log(`Aplicação rodando na porta ${PORTA}`))