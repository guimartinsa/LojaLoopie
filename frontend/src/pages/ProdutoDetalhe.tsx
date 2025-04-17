import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCarrinho } from "../services/CarrinhoContext"; // ⬅️ IMPORTANTE
import Header from "../components/Header"; // ajuste o caminho se necessário
import "../assets/Home.css"

interface ImagemGaleria {
    id: number;
    imagem: string;
    legenda: string;
}

interface Produto {
    nome: string;
    descricao: string;
    preco: string;
    imagem_principal: string;
    imagens: ImagemGaleria[];
    estoque: number;
    id: number;
    slug: string;
}

const ProdutoDetalhe: React.FC = () => {
    const { slug } = useParams();
    const [produto, setProduto] = useState<Produto | null>(null);
    const { adicionarAoCarrinho } = useCarrinho(); // ⬅️ Hook do carrinho


    useEffect(() => {
        fetch(`http://localhost:8000/api/produtos/${slug}/`)
            .then((res) => res.json())
            .then((data) => setProduto(data))
            .catch((err) => console.error("Erro ao carregar produto:", err));
    }, [slug]);

    if (!produto) return <p>Carregando...</p>;

    return (
        <>
            <Header /> {/* 👈 Header com campo de busca */}
            <div style={{ padding: "2rem" }}>
                <h1>{produto.nome}</h1>
                <img
                    src={produto.imagem_principal}
                    alt={produto.nome}
                    style={{ maxWidth: "300px", borderRadius: "1rem" }}
                />
                <p style={{ marginTop: "1rem" }}><strong>R$ {produto.preco}</strong></p>
                <p>{produto.descricao}</p>
                <p>Estoque disponível: {produto.estoque}</p>

                <button
                    style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        background: "#222",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer"
                    }}
                    onClick={() => adicionarAoCarrinho(produto)}
                >
                    Adicionar ao Carrinho
                </button>

                {produto.imagens.length > 0 && (
                    <>
                        <h3>Galeria</h3>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            {produto.imagens.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.imagem}
                                    alt={img.legenda}
                                    style={{ width: "150px", borderRadius: "0.5rem" }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProdutoDetalhe;
