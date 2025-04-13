import React, { useState } from 'react';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui depois enviaremos para o backend
        console.log({ name, price, image, category });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>

            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full mb-2 border p-2 rounded"
            />

            <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full mb-2 border p-2 rounded"
            />

            <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="block w-full mb-2"
            />

            <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full mb-2 border p-2 rounded"
            />

            <button type="submit" className="bg-pink-300 hover:bg-pink-400 text-white py-2 px-4 rounded">
                Salvar Produto
            </button>
        </form>
    );
};

export default ProductForm;
