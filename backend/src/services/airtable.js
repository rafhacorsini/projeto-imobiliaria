/**
 * Airtable Service
 * Integração com a API do Airtable para CRUD de leads
 */

/**
 * Obtém configurações do Airtable (lidas em tempo de execução)
 */
const getConfig = () => {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads'
    const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`

    return { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, BASE_URL }
}

/**
 * Headers padrão para requisições ao Airtable
 */
const getHeaders = () => {
    const { AIRTABLE_API_KEY } = getConfig()
    return {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
    }
}

/**
 * Verifica se as credenciais do Airtable estão configuradas
 */
export const isConfigured = () => {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = getConfig()
    const configured = AIRTABLE_API_KEY &&
        AIRTABLE_API_KEY !== 'cole_seu_token_aqui' &&
        AIRTABLE_BASE_ID &&
        AIRTABLE_BASE_ID !== 'cole_seu_base_id_aqui'

    if (!configured) {
        console.log('[Airtable] Não configurado. Verifique as variáveis de ambiente.')
        console.log('[Airtable] AIRTABLE_API_KEY:', AIRTABLE_API_KEY ? 'definido' : 'NÃO DEFINIDO')
        console.log('[Airtable] AIRTABLE_BASE_ID:', AIRTABLE_BASE_ID ? 'definido' : 'NÃO DEFINIDO')
    }

    return configured
}

/**
 * Cria um novo lead no Airtable
 */
export const createLead = async (leadData) => {
    const { BASE_URL, AIRTABLE_TABLE_NAME } = getConfig()

    if (!isConfigured()) {
        console.log('[Airtable] Salvando apenas localmente (fallback)')
        return { id: `local_${Date.now()}`, fields: leadData, _local: true }
    }

    console.log('[Airtable] ========================================')
    console.log('[Airtable] Enviando lead para Airtable...')
    console.log('[Airtable] URL:', BASE_URL)
    console.log('[Airtable] Dados:', JSON.stringify(leadData, null, 2))
    console.log('[Airtable] ========================================')

    // Monta os campos para enviar (apenas os que existem no Airtable)
    const fieldsToSend = {
        Nome: leadData.nome,
        Telefone: leadData.telefone,
        Email: leadData.email,
        Interesse: leadData.interesse
    }

    // Adiciona campos opcionais apenas se existirem
    if (leadData.regiao) fieldsToSend['Região'] = leadData.regiao
    if (leadData.faixa_preco) fieldsToSend['Faixa de Preço'] = leadData.faixa_preco
    if (leadData.data_entrada) fieldsToSend['Data de Entrada'] = leadData.data_entrada
    if (leadData.origem) fieldsToSend['Origem'] = leadData.origem
    // NOTA: Campo 'Status' removido - adicione a coluna 'Status' no Airtable se quiser usá-lo
    // if (leadData.status) fieldsToSend['Status'] = leadData.status

    console.log('[Airtable] Campos a enviar:', JSON.stringify(fieldsToSend, null, 2))

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                records: [{
                    fields: fieldsToSend
                }]
            })
        })

        console.log('[Airtable] Resposta status:', response.status)

        const responseText = await response.text()
        console.log('[Airtable] Resposta raw:', responseText)

        let data
        try {
            data = JSON.parse(responseText)
        } catch (parseError) {
            console.error('[Airtable] ❌ Erro ao parsear resposta:', parseError.message)
            throw new Error('Resposta inválida do Airtable')
        }

        if (!response.ok) {
            console.error('[Airtable] ❌ ERRO DA API:')
            console.error('[Airtable] Status:', response.status)
            console.error('[Airtable] Erro:', JSON.stringify(data, null, 2))
            throw new Error(data.error?.message || 'Erro ao salvar no Airtable')
        }

        console.log('[Airtable] ✅ Lead criado com sucesso! ID:', data.records[0].id)
        return data.records[0]

    } catch (error) {
        console.error('[Airtable] ❌ Erro completo:', error)
        console.error('[Airtable] ❌ Mensagem:', error.message)
        // Não joga erro - retorna localmente para não quebrar o fluxo
        console.log('[Airtable] Salvando localmente como fallback...')
        return { id: `local_${Date.now()}`, fields: leadData, _local: true }
    }
}

/**
 * Lista todos os leads do Airtable
 */
export const getLeads = async () => {
    const { BASE_URL } = getConfig()

    if (!isConfigured()) {
        console.log('[Airtable] Não configurado - retornando lista vazia')
        return []
    }

    const response = await fetch(`${BASE_URL}?sort[0][field]=Data de Entrada&sort[0][direction]=desc`, {
        method: 'GET',
        headers: getHeaders()
    })

    if (!response.ok) {
        const error = await response.json()
        console.error('[Airtable] Erro ao listar leads:', error)
        throw new Error(error.error?.message || 'Erro ao buscar leads')
    }

    const data = await response.json()
    console.log(`[Airtable] ${data.records.length} leads encontrados`)

    return data.records.map(record => ({
        id: record.id,
        nome: record.fields.Nome,
        telefone: record.fields.Telefone,
        email: record.fields.Email,
        interesse: record.fields.Interesse,
        regiao: record.fields['Região'],
        faixa_preco: record.fields['Faixa de Preço'],
        data_entrada: record.fields['Data de Entrada'],
        origem: record.fields.Origem,
        status: record.fields.Status
    }))
}

/**
 * Atualiza o status de um lead
 */
export const updateLeadStatus = async (recordId, newStatus) => {
    const { BASE_URL } = getConfig()

    if (!isConfigured()) {
        return { id: recordId, status: newStatus, _local: true }
    }

    const response = await fetch(`${BASE_URL}/${recordId}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
            fields: { Status: newStatus }
        })
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'Erro ao atualizar status')
    }

    const data = await response.json()
    console.log('[Airtable] Status atualizado:', recordId, '->', newStatus)
    return data
}

/**
 * Deleta um lead
 */
export const deleteLead = async (recordId) => {
    const { BASE_URL } = getConfig()

    if (!isConfigured()) {
        return { deleted: true, id: recordId, _local: true }
    }

    const response = await fetch(`${BASE_URL}/${recordId}`, {
        method: 'DELETE',
        headers: getHeaders()
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || 'Erro ao deletar lead')
    }

    console.log('[Airtable] Lead deletado:', recordId)
    return { deleted: true, id: recordId }
}

export default {
    isConfigured,
    createLead,
    getLeads,
    updateLeadStatus,
    deleteLead
}
