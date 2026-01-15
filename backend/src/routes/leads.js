import express from 'express'
import * as airtable from '../services/airtable.js'
import * as whatsapp from '../services/whatsapp.js'

const router = express.Router()

/**
 * POST /api/leads
 * Cria um novo lead
 */
router.post('/', async (req, res) => {
    try {
        const { nome, telefone, email, interesse, regiao, faixa_preco } = req.body

        // Validação básica
        if (!nome || !telefone || !email || !interesse) {
            return res.status(400).json({
                error: 'Campos obrigatórios faltando',
                required: ['nome', 'telefone', 'email', 'interesse']
            })
        }

        // Prepara dados do lead
        const leadData = {
            nome,
            telefone,
            email,
            interesse,
            regiao: regiao || 'Não informada',
            faixa_preco: faixa_preco || 'Não informada',
            data_entrada: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            origem: 'Landing Page',
            status: 'Novo'
        }

        // Salva no Airtable
        const savedLead = await airtable.createLead(leadData)

        // Envia WhatsApp (simulado)
        const whatsappResult = await whatsapp.sendWelcomeMessage(leadData)

        // Notifica corretor (simulado)
        const notifyResult = await whatsapp.notifyAgent(leadData)

        console.log(`✅ Lead criado com sucesso: ${nome}`)

        res.status(201).json({
            success: true,
            message: 'Lead cadastrado com sucesso!',
            lead: savedLead,
            notifications: {
                whatsapp: whatsappResult,
                agent: notifyResult
            }
        })

    } catch (error) {
        console.error('Erro ao criar lead:', error)
        res.status(500).json({
            error: 'Erro ao processar lead',
            message: error.message
        })
    }
})

/**
 * GET /api/leads
 * Lista todos os leads
 */
router.get('/', async (req, res) => {
    try {
        const leads = await airtable.getLeads()

        res.json({
            success: true,
            count: leads.length,
            leads
        })

    } catch (error) {
        console.error('Erro ao listar leads:', error)
        res.status(500).json({
            error: 'Erro ao buscar leads',
            message: error.message
        })
    }
})

/**
 * PUT /api/leads/:id/status
 * Atualiza status de um lead
 */
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!status) {
            return res.status(400).json({ error: 'Status é obrigatório' })
        }

        const result = await airtable.updateLeadStatus(id, status)

        res.json({
            success: true,
            message: 'Status atualizado',
            lead: result
        })

    } catch (error) {
        console.error('Erro ao atualizar status:', error)
        res.status(500).json({
            error: 'Erro ao atualizar status',
            message: error.message
        })
    }
})

/**
 * DELETE /api/leads/:id
 * Remove um lead
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await airtable.deleteLead(id)

        res.json({
            success: true,
            message: 'Lead removido',
            ...result
        })

    } catch (error) {
        console.error('Erro ao deletar lead:', error)
        res.status(500).json({
            error: 'Erro ao deletar lead',
            message: error.message
        })
    }
})

export default router
