import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ProductList from "./components/product-list";
import Login from "./components/Login"; // Asegúrate de que la ruta sea correcta
import NewPassword from "./components/Newpassword"; // Importamos el nuevo archivo
import dataProducts from "./data.json";
import AdminProduct from "./components/LoginUser/Admin-product";

function App() {
  const [filteredProducts, setFilteredProducts] = useState(dataProducts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = dataProducts.filter((product) =>
      product.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredProducts(filteredData);
  }, [searchTerm]);

  return (
    <div className="w-full min-h-screen pb-12">
      <Routes>
        {/* Ruta para la página principal */}
        <Route
          path="/"
          element={
            <>
              <Header setFilteredProducts={setFilteredProducts} setSearchTerm={setSearchTerm} />
              <ProductList filteredProducts={filteredProducts} />
            </>
          }
        />

        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta para Login admin */}
         <Route path="/admin-product" element={<AdminProduct />} />

        {/* Nueva ruta para recuperación de contraseña */}
        <Route path="/reset-password" element={<NewPassword />} />
      </Routes>
    </div>
  );
}

export default App;
