import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import ProductDetail from "./components/ProductDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import AllProductos from "./components/AllProdcuts";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./components/Admin";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]); // Se define el estado del carrito
  const { isAuthenticated } = useAuth(); // Se obtiene el estado de autenticación
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://67252ed8c39fedae05b4299f.mockapi.io/productos");
      const data = await res.json();
      setProductos(data);
    };

    fetchData();
  }, []);



 

  return (
    <Router>
    <Navbar />

    <Routes>
      <Route path="/" element={
        <>
          <Carousel />
          <ProductList productos={productos}  />
        </>
      } />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/all" element={<AllProductos productos={productos} />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route path="/admin" element={
        <RutaProtegida>
          <Admin />
        </RutaProtegida>
      } />
      <Route path="/cart" element={
        <RutaProtegida>
          <Cart />
        </RutaProtegida>
      } />
    </Routes>

    <Footer />
  </Router>
     );
}

export default App;
