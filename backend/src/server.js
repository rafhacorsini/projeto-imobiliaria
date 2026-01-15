// Carrega .env apenas em desenvolvimento local (Railway injeta direto no process.env)
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '..', '.env')

// Só carrega .env se o arquivo existir (desenvolvimento local)
if (existsSync(envPath)) {
    dotenv.config({ path: envPath })
    console.log('[Env] Carregado de arquivo .env local')
} else {
    console.log('[Env] Usando variáveis de ambiente do sistema (produção)')
}

// Debug: mostra se as variáveis do Airtable estão configuradas
console.log('[Env] AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? 'configurado ✅' : 'NÃO DEFINIDO ❌')
console.log('[Env] AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? 'configurado ✅' : 'NÃO DEFINIDO ❌')
console.log('[Env] AIRTABLE_TABLE_NAME:', process.env.AIRTABLE_TABLE_NAME || 'não definido, usando Leads')

import express from 'express'
import cors from 'cors'
import leadsRouter from './routes/leads.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares - CORS para permitir frontend local e produção
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://projeto-imobiliaria.vercel.app',
        /\.vercel\.app$/  // Aceita qualquer subdomínio do Vercel
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
})

// Rotas
app.use('/api/leads', leadsRouter)

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Imobiliária Conecta API'
    })
})

// Error handler
app.use((err, req, res, next) => {
    console.error('Erro:', err.message)
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    })
})

// Inicia servidor
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   Imobiliária Conecta - Backend API       ║
╠═══════════════════════════════════════════╣
║   Status: ONLINE                          ║
║   Porta: ${PORT}                              ║
║   URL: http://localhost:${PORT}              ║
╚═══════════════════════════════════════════╝
  `)
})

export default app
