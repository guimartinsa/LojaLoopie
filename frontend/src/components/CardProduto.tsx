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
    //const { adicionarAoCarrinho } = useCarrinho();
    /*const handleClick = () => {
        console.log(`Produto adicionado ao carrinho: ${produto.nome}`);
        onAdicionar();
    };*/

    return (
        <div className="card">
            <Link to={`/produto/${produto.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={produto.imagem_principal} alt={produto.nome} />
                <h3>{produto.nome}</h3>
                <p>R$ {produto.preco}</p>
            </Link>
            <button onClick={onAdicionar}>
                Adicionar ao Carrinho
            </button>
        </div>
    );
};

export default CardProduto;
