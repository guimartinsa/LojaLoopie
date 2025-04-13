// src/services/produtoService.ts
import axios from "axios";

const API_URL = "http://localhost:8000/api/produtos/";

export const buscarProdutos = async () => {
    const resposta = await axios.get(API_URL);
    return resposta.data;
};
