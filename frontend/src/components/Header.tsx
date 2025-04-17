// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import BarraDeBusca from "./BarraDeBusca";
import "../assets/Header.css";
import logo from "../assets/logo.jpg";


const Header = () => {
    const navigate = useNavigate();

    const handleBusca = (termo: string) => {
        if (termo.trim()) {
            navigate(`/busca?q=${encodeURIComponent(termo)}`);
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Loopie" className="logo-img" />
                </Link>
            </div>
            <BarraDeBusca onBuscar={handleBusca} /> {/* 👈 Corrigido */}
            <nav className="menu">
                <Link to="/carrinho">Carrinho</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
};

export default Header;
