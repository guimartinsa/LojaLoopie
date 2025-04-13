import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProdutoDetalhe from "./pages/ProdutoDetalhe";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:slug" element={<ProdutoDetalhe />} />
        {/* outras rotas virão aqui */}
      </Routes>
    </BrowserRouter>
  );
}
