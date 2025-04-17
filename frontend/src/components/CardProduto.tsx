import { Link } from "react-router-dom";
//import { useCarrinho } from '../services/CarrinhoContext';

interface Produto {
    id: number;
    nome: string;
    preco: string;
    imagem_principal: string;
    slug: string;
}

interface CardProdutoProps {
    produto: Produto;
    onAdicionar: () => void;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto, onAdicionar }) => {
    /*const handleClick = () => {
        console.log(`Produto adicionado ao carrinho: ${produto.nome}`);
        onAdicionar();
    };*/

    return (
        <div className="card"
            style={{
                border: "1px solid #3a2e2b",
                borderRadius: "1rem",
                padding: "1rem",
                textAlign: "center",
                margin: "1rem",
                width: "200px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                
            }}
        >
            <Link to={`/produto/${produto.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={produto.imagem_principal} alt={produto.nome} />
                <h3>{produto.nome}</h3>
                <p>R$ {produto.preco}</p>
            </Link>
            <button onClick={onAdicionar}
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    background: "#222",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer"
                }}
            >
                Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default CardProduto;
