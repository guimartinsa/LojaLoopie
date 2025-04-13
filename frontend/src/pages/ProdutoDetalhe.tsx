import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


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
}

const ProdutoDetalhe: React.FC = () => {
    const { slug } = useParams();
    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/produtos/${slug}/`)
            .then((res) => res.json())
            .then((data) => setProduto(data))
            .catch((err) => console.error("Erro ao carregar produto:", err));
    }, [slug]);

    if (!produto) return <p>Carregando...</p>;

    return (
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
    );
};

export default ProdutoDetalhe;
