// src/components/BarraDeBusca.tsx
import { useEffect, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { buscarProdutos } from "../utils/produtoService";
import "../assets/Header.css";

interface Produto {
    id: number;
    nome: string;
    slug: string;
    imagem_principal: string;
}

interface BarraDeBuscaProps {
    onBuscar: (termo: string) => void;
}

const BarraDeBusca: React.FC<BarraDeBuscaProps> = ({ onBuscar }) => {
    const [busca, setBusca] = useState("");
    const [sugestoes, setSugestoes] = useState<Produto[]>([]);
    const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarSugestoes = async () => {
            if (busca.trim().length === 0) {
                setSugestoes([]);
                return;
            }
            try {
                const produtos = await buscarProdutos();
                const filtrados = produtos.filter((produto: Produto) =>
                    produto.nome.toLowerCase().includes(busca.toLowerCase())
                );
                setSugestoes(filtrados.slice(0, 5));
            } catch (err) {
                console.error("Erro ao buscar sugestões:", err);
            }
        };
        carregarSugestoes();
    }, [busca]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setIndiceSelecionado((prev) =>
                prev === null || prev === sugestoes.length - 1 ? 0 : prev + 1
            );
        } else if (e.key === "ArrowUp") {
            setIndiceSelecionado((prev) =>
                prev === null || prev === 0 ? sugestoes.length - 1 : prev - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (indiceSelecionado !== null && sugestoes[indiceSelecionado]) {
                navigate(`/produto/${sugestoes[indiceSelecionado].slug}`);
            } else {
                onBuscar(busca);
            }
            setSugestoes([]);
        }
    };

    return (
        <div className="barra-de-busca">
            <input
                type="text"
                placeholder="Buscar produto..."
                value={busca}
                onChange={(e) => {
                    setBusca(e.target.value);
                    setIndiceSelecionado(null);
                }}
                onKeyDown={handleKeyDown}
            />
            {sugestoes.length > 0 && (
                <ul className="sugestoes">
                    {sugestoes.map((produto, index) => (
                        <li
                            key={produto.id}
                            className={`sugestao-item ${index === indiceSelecionado ? "selecionado" : ""}`}
                            onMouseDown={() => navigate(`/produto/${produto.slug}`)}
                        >
                            <img src={produto.imagem_principal} alt={produto.nome} className="sugestao-img" />
                            <span>{produto.nome}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BarraDeBusca;
