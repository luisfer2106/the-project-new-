// src/components/Header.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { ShoppingCartIcon } from "./icons";
import { useShoppingCart } from "../hooks";
import ShoppingCart from "./shopping-cart";
import dataProducts from "../data.json";
import UserMenu from "./UserMenu";

function Header({ setFilteredProducts, setSearchTerm }) {
  const [showCart, setShowCart] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");
  const [userName, setUserName] = useState("");
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const { products } = useShoppingCart();

  // Recuperar el nombre del usuario desde localStorage
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombre");
    if (nombreGuardado) {
      setUserName(nombreGuardado);
    }
  }, []);

  const handleShowCart = () => setShowCart(!showCart);

  const confirmLogout = () => setShowConfirmLogout(true);
  const cancelLogout = () => setShowConfirmLogout(false);

  const handleLogout = () => {
    localStorage.removeItem("id_rol");
    localStorage.removeItem("nombre");
    sessionStorage.clear();
    navigate("/login");
  };

  const filterGameById = (id) => {
    setSelectedGame(id);
    setFilteredProducts(
      id === ""
        ? dataProducts
        : dataProducts.filter((product) => product.id === id)
    );
  };

  return (
    <header className="w-full sticky top-0 bg-gray-900 text-white z-40 shadow-md">
      {/* Barra superior */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo + Título */}
        <div className="flex items-center gap-2">
          <img src="/videojuego.png" alt="Videojuego Icon" className="w-8 h-8" />
          <h1 className="text-xl font-bold">KingGames</h1>
        </div>

        {/* Carrito + Menú usuario */}
        <div className="relative flex items-center gap-4">
          {/* Carrito */}
          <button
            className="hover:bg-slate-200/20 rounded-full p-2 text-white flex items-center gap-1"
            onClick={handleShowCart}
          >
            <ShoppingCartIcon />
            <div className="bg-white p-1 text-xs text-gray-900 w-6 h-6 rounded-full flex justify-center items-center">
              <span>{products.length}</span>
            </div>
          </button>

          {showCart && (
            <div className="absolute top-12 right-0 w-max z-50">
              <ShoppingCart />
            </div>
          )}

          {/* Menú de usuario */}
          <UserMenu />
        </div>
      </div>

      {/* Selectores de plataforma + Buscador */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col items-center">
        <div className="select-container flex gap-4 mb-2 w-full justify-center">
          {["PS5", "PS4", "XBOX", "PC"].map((platform) => (
            <select
              className="custom-select"
              value={selectedGame}
              onChange={(e) => filterGameById(e.target.value)}
              key={platform}
            >
              <option value="">{`Juegos de ${platform}`}</option>
              {dataProducts
                .filter((product) => product.platform === platform)
                .map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
            </select>
          ))}
        </div>

        <div className="search-container relative w-full max-w-lg">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Buscar juego..."
            className="custom-input search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Bienvenida flotante + logout */}
      {userName && (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-3">
          <img
            src="/avatar.svg"
            alt="Usuario"
            className="w-6 h-6 rounded-full border border-white"
          />
          <span>
            Bienvenido, <strong>{userName}</strong>
          </span>
          <button
            className="logout-button text-white hover:text-red-400"
            onClick={confirmLogout}
            title="Cerrar sesión"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirmLogout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 w-80">
            <h2 className="text-lg font-semibold mb-2">¿Cerrar sesión?</h2>
            <p className="mb-4">Tu sesión se cerrará y volverás al login.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                onClick={cancelLogout}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded"
                onClick={handleLogout}
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
