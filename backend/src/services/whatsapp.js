/**
 * WhatsApp Service (Simulado)
 * Para produção, integrar com Evolution API ou Z-API
 */

/**
 * Simula envio de mensagem de boas-vindas ao lead
 */
export const sendWelcomeMessage = async (lead) => {
    const message = `
Olá ${lead.nome.split(' ')[0]}! 👋

Obrigado pelo interesse na *Imobiliária Conecta*.

Recebemos sua solicitação para *${lead.interesse}* na região *${lead.regiao}*.

Um de nossos consultores especializados entrará em contato em breve para apresentar as melhores opções dentro do seu perfil.

Enquanto isso, você pode acessar nosso catálogo em: https://imobiliaria-conecta.com.br

Atenciosamente,
Equipe Conecta 🏠
  `.trim()

    // Simula log de envio
    console.log(`
╔═══════════════════════════════════════════════════╗
║  📱 WHATSAPP SIMULADO                             ║
╠═══════════════════════════════════════════════════╣
║  Para: ${lead.telefone.padEnd(40)}║
╠═══════════════════════════════════════════════════╣
${message.split('\n').map(line => `║  ${line.padEnd(48)}║`).join('\n')}
╚═══════════════════════════════════════════════════╝
  `)

    // Em produção, aqui entraria a chamada real da API
    // Exemplo com Evolution API:
    // await fetch('http://localhost:8080/message/sendText/instance', {
    //   method: 'POST',
    //   headers: { 'apikey': 'sua-api-key' },
    //   body: JSON.stringify({
    //     number: lead.telefone,
    //     text: message
    //   })
    // })

    return {
        sent: true,
        to: lead.telefone,
        timestamp: new Date().toISOString(),
        _simulated: true
    }
}

/**
 * Simula notificação para o corretor
 */
export const notifyAgent = async (lead, agentPhone = '11999999999') => {
    const notification = `
🚨 *NOVO LEAD!*

📋 *Dados do Cliente:*
• Nome: ${lead.nome}
• Telefone: ${lead.telefone}
• Email: ${lead.email}

🏠 *Interesse:*
• Tipo: ${lead.interesse}
• Região: ${lead.regiao}
• Faixa: ${lead.faixa_preco}

⏰ Recebido em: ${lead.data_entrada}

_Entre em contato o mais rápido possível!_
  `.trim()

    console.log(`
╔═══════════════════════════════════════════════════╗
║  📱 NOTIFICAÇÃO CORRETOR (SIMULADO)               ║
╠═══════════════════════════════════════════════════╣
║  Para: Corretor (${agentPhone})                   ║
╠═══════════════════════════════════════════════════╣
${notification.split('\n').map(line => `║  ${line.padEnd(48)}║`).join('\n')}
╚═══════════════════════════════════════════════════╝
  `)

    return {
        sent: true,
        to: agentPhone,
        timestamp: new Date().toISOString(),
        _simulated: true
    }
}

export default {
    sendWelcomeMessage,
    notifyAgent
}
