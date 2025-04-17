import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import Login from './pages/Login'; // importando a tela de login

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:slug" element={<ProdutoDetalhe />} />
        <Route path="/login" element={<Login />} /> {/* nova rota */}
      </Routes>
    </BrowserRouter>
  );
}
