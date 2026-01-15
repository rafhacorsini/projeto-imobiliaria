import Header from '../components/Header'
import Footer from '../components/Footer'
import LeadForm from '../components/LeadForm'
import { Shield, Clock, Search, MapPin, Building, Trophy } from 'lucide-react'

function Home() {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-grid">
                    <div className="hero-text">
                        <span className="hero-tag">Imobiliária Conecta</span>
                        <h1>
                            Curadoria de Imóveis para quem exige <span style={{ color: 'var(--text-tertiary)' }}>Exclusividade</span>.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginTop: '24px', marginBottom: '40px' }}>
                            Simplificamos a busca pelo seu próximo investimento. Acesso off-market a propriedades premium na Zona Sul.
                        </p>

                        <div className="trust-badges">
                            <div className="trust-item">
                                <span className="trust-number">15+</span>
                                <span className="trust-label">Anos de Mercado</span>
                            </div>
                            <div className="trust-item">
                                <span className="trust-number">R$ 500M</span>
                                <span className="trust-label">Em VGV Gerido</span>
                            </div>
                            <div className="trust-item">
                                <span className="trust-number">Off-Market</span>
                                <span className="trust-label">Acesso Exclusivo</span>
                            </div>
                        </div>
                    </div>

                    <LeadForm />
                </div>
            </section>

            {/* Features Section */}
            <section className="section-features" id="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Por que a Conecta?</h2>
                        <p>Uma abordagem consultiva e transparente para sua aquisição imobiliária.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="icon-box"><Clock size={24} /></div>
                            <h3>Agilidade Real</h3>
                            <p>Resposta em até 5 minutos e agendamento prioritário.</p>
                        </div>

                        <div className="feature-item">
                            <div className="icon-box"><Search size={24} /></div>
                            <h3>Curadoria</h3>
                            <p>Não desperdiçamos seu tempo. Apenas imóveis verificados.</p>
                        </div>

                        <div className="feature-item">
                            <div className="icon-box"><Shield size={24} /></div>
                            <h3>Compliance</h3>
                            <p>Análise jurídica completa antes de qualquer visita.</p>
                        </div>

                        <div className="feature-item">
                            <div className="icon-box"><MapPin size={24} /></div>
                            <h3>Localização</h3>
                            <p>Especialistas nos bairros mais valorizados da cidade.</p>
                        </div>

                        <div className="feature-item">
                            <div className="icon-box"><Building size={24} /></div>
                            <h3>Off-Market</h3>
                            <p>Acesso a imóveis que não estão nos portais públicos.</p>
                        </div>

                        <div className="feature-item">
                            <div className="icon-box"><Trophy size={24} /></div>
                            <h3>Negociação</h3>
                            <p>Defendemos seus interesses para garantir o melhor deal.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home
