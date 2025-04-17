import { useEffect, useState } from "react";
import CardProduto from "../components/CardProduto";
import { buscarProdutos } from "../utils/produtoService";
import { useCarrinho } from "../services/CarrinhoContext";
import Header from "../components/Header"; // ajuste o caminho se necessário
import "../assets/Home.css"; // ajuste o caminho se necessário


interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem_principal: string;
  slug: string;
}

function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { adicionarAoCarrinho } = useCarrinho();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const dados = await buscarProdutos();
        setProdutos(dados);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      }
    };
    carregarProdutos();
  }, []);

  return (
    <>
      <Header />
      <section style={{ padding: "2rem" }}>
        <div className="produtos">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              onAdicionar={() => adicionarAoCarrinho(produto)}
            />
          ))}
        </div>
      </section>
    </>
  );
  
}

export default Home;
