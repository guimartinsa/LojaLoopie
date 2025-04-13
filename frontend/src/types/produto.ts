export interface Categoria {
    id: number;
    nome: string;
    slug: string;
}

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Categoria | null;
    estoque: number;
    slug: string;
    criado_em: string;
}
