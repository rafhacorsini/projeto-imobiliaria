import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'

function LeadForm() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        interesse: '',
        regiao: '',
        faixa_preco: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // API de produção no Railway
            const API_URL = 'https://projeto-imobiliaria-production.up.railway.app'

            const response = await fetch(`${API_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Erro na API')
            }

            const result = await response.json()
            console.log('Lead salvo:', result)

            // Também salva localmente como backup
            const leads = JSON.parse(localStorage.getItem('leads') || '[]')
            leads.push({ ...formData, id: result.lead?.id || Date.now(), data_entrada: new Date().toLocaleString('pt-BR'), status: 'Novo' })
            localStorage.setItem('leads', JSON.stringify(leads))

            navigate('/obrigado')

        } catch (error) {
            console.error('Erro ao enviar para API, salvando localmente:', error)

            // Fallback: salva localmente se a API falhar
            const leadData = {
                ...formData,
                id: Date.now(),
                data_entrada: new Date().toLocaleString('pt-BR'),
                origem: 'Landing Page',
                status: 'Novo'
            }
            const leads = JSON.parse(localStorage.getItem('leads') || '[]')
            leads.push(leadData)
            localStorage.setItem('leads', JSON.stringify(leads))

            navigate('/obrigado')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Encontre seu imóvel</h2>
            <p style={{ marginBottom: '24px', fontSize: '0.9rem' }}>Preencha para receber opções selecionadas.</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome Completo</label>
                    <input
                        className="input-field"
                        type="text"
                        name="nome"
                        placeholder="Ex: João Silva"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Telefone</label>
                        <input
                            className="input-field"
                            type="tel"
                            name="telefone"
                            placeholder="(11) 99999-9999"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            placeholder="joao@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Interesse</label>
                        <select
                            className="input-field"
                            name="interesse"
                            value={formData.interesse}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Comprar">Comprar</option>
                            <option value="Alugar">Alugar</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Região</label>
                        <input
                            className="input-field"
                            type="text"
                            name="regiao"
                            placeholder="Ex: Jardins"
                            value={formData.regiao}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Investimento</label>
                    <select
                        className="input-field"
                        name="faixa_preco"
                        value={formData.faixa_preco}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Até R$ 500k">Até R$ 500k</option>
                        <option value="R$ 500k - R$ 1M">R$ 500k - R$ 1M</option>
                        <option value="Acima de R$ 1M">Acima de R$ 1M</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                            Solicitar Atendimento <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default LeadForm
