import { Link } from 'react-router-dom'
import { CheckCircle, ArrowLeft } from 'lucide-react'

function Obrigado() {
    return (
        <div className="page-center">
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
                <div style={{ color: '#10B981', display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <CheckCircle size={64} strokeWidth={1.5} />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Solicitação Enviada</h1>

                <p style={{ marginBottom: '40px' }}>
                    Recebemos seus dados com sucesso. Nosso consultor especialista entrará em contato em breve.
                </p>

                <Link to="/" className="btn btn-primary" style={{ width: '100%' }}>
                    <ArrowLeft size={18} /> Voltar ao Início
                </Link>
            </div>
        </div>
    )
}

export default Obrigado
