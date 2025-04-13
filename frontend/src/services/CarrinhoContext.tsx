import { createContext, useContext, useState, ReactNode } from 'react';


interface Produto {
    id: number;
    nome: string;
    preco: string;
    imagem_principal: string;
    slug: string;
}

interface CarrinhoContextType {
    carrinho: Produto[];
    adicionarAoCarrinho: (produto: Produto) => void;
    removerDoCarrinho: (slug: string) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
    const [carrinho, setCarrinho] = useState<Produto[]>([]);

    const adicionarAoCarrinho = (produto: Produto) => {
        setCarrinho((prev) => [...prev, produto]);
    };

    const removerDoCarrinho = (slug: string) => {
        setCarrinho((prev) => prev.filter((p) => p.slug !== slug));
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = (): CarrinhoContextType => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinho deve ser usado dentro do CarrinhoProvider');
    }
    return context;
};
