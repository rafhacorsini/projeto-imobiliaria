import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trash2, Phone, Mail } from 'lucide-react'
import Header from '../components/Header'

function Dashboard() {
    const [leads, setLeads] = useState([])
    const [stats, setStats] = useState({ total: 0, novos: 0, emContato: 0 })

    useEffect(() => {
        const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
        setLeads(storedLeads)
        calculateStats(storedLeads)
    }, [])

    const calculateStats = (data) => {
        setStats({
            total: data.length,
            novos: data.filter(l => l.status === 'Novo').length,
            emContato: data.filter(l => l.status === 'Em Contato').length
        })
    }

    const handleDelete = (id) => {
        if (confirm('Excluir este lead?')) {
            const updated = leads.filter(l => l.id !== id)
            setLeads(updated)
            localStorage.setItem('leads', JSON.stringify(updated))
            calculateStats(updated)
        }
    }

    const updateStatus = (id, newStatus) => {
        const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l)
        setLeads(updated)
        localStorage.setItem('leads', JSON.stringify(updated))
        calculateStats(updated)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Novo': return '#EF4444' // Red
            case 'Em Contato': return '#F59E0B' // Orange
            case 'Convertido': return '#10B981' // Green
            default: return '#9CA3AF'
        }
    }

    return (
        <>
            <Header />

            <div className="dashboard-wrapper">
                <div className="container">
                    <div className="dashboard-header">
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Dashboard</h1>
                            <p>Gestão de leads e oportunidades.</p>
                        </div>
                        <Link to="/" className="btn btn-outline">
                            <ArrowLeft size={16} /> Voltar ao Site
                        </Link>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-box">
                            <div className="stat-value">{stats.total}</div>
                            <div className="stat-label">Total Leads</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value" style={{ color: '#EF4444' }}>{stats.novos}</div>
                            <div className="stat-label">Novos</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value" style={{ color: '#F59E0B' }}>{stats.emContato}</div>
                            <div className="stat-label">Em Negociação</div>
                        </div>
                    </div>

                    <div className="table-container">
                        {leads.length === 0 ? (
                            <div style={{ padding: '60px', textAlign: 'center' }}>
                                <p>Nenhum lead encontrado.</p>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Contato</th>
                                        <th>Interesse</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map(lead => (
                                        <tr key={lead.id}>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{lead.nome}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                                                    {lead.data_entrada}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <Phone size={14} /> {lead.telefone}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Mail size={14} /> {lead.email}
                                                </div>
                                            </td>
                                            <td>
                                                <div>{lead.interesse}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                                                    {lead.regiao} • {lead.faixa_preco}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span className="status-dot" style={{ background: getStatusColor(lead.status) }}></span>
                                                    <select
                                                        value={lead.status}
                                                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                        style={{ border: 'none', background: 'transparent', fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                                    >
                                                        <option value="Novo">Novo</option>
                                                        <option value="Em Contato">Em Contato</option>
                                                        <option value="Convertido">Convertido</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button onClick={() => handleDelete(lead.id)} style={{ color: 'var(--text-tertiary)', padding: '8px' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
