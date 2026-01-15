import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

function Header() {
    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <Home size={20} strokeWidth={2.5} />
                    Conecta
                </Link>

                <nav>
                    <ul className="nav-links">
                        <li><a href="#features">Vantagens</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header

