import { Link } from "react-router-dom";
import { useCarrinho } from '../services/CarrinhoContext';

interface Produto {
    id: number;
    nome: string;
    preco: string;
    imagem_principal: string;
    slug: string;
}

interface CardProdutoProps {
    produto: Produto;
}

const CardProduto: React.FC<CardProdutoProps> = ({ produto }) => {
    const { adicionarAoCarrinho } = useCarrinho();

    return (
        <div className="card">
            <Link to={`/produto/${produto.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={produto.imagem_principal} alt={produto.nome} />
                <h3>{produto.nome}</h3>
                <p>R$ {produto.preco}</p>
            </Link>
            <button onClick={() => adicionarAoCarrinho(produto)}>
                Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default CardProduto;
