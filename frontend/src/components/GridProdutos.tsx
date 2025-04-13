import CardProduto from "./CardProduto";

const produtos = [
    { imagem: "/produto1.jpg", nome: "Amigurumi Coelhinho", preco: "R$ 45,00" },
    { imagem: "/produto2.jpg", nome: "Kit Crochê Bebê", preco: "R$ 70,00" },
    { imagem: "/produto3.jpg", nome: "Mini Cacto Decorativo", preco: "R$ 25,00" },
];

const GridProdutos = () => (
    <section className="produtos">
        {produtos.map((produto, index) => (
            <CardProduto key={index} {...produto} />
        ))}
    </section>
);

export default GridProdutos;
