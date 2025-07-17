import { useEffect, useState } from "react";
import { ShoppingCartIcon } from "./icons";
import { useShoppingCart } from "../hooks";
import ShoppingCart from "./shopping-cart";
import dataProducts from "../data.json";
import UserMenu from "./UserMenu";

function Header({ setFilteredProducts, setSearchTerm }) {
  const [showCart, setShowCart] = useState(false);
  const { products } = useShoppingCart();
  const [selectedGame, setSelectedGame] = useState("");
  const [userName, setUserName] = useState("");

  // Recuperar el nombre del usuario desde localStorage
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombre");
    if (nombreGuardado) {
      setUserName(nombreGuardado);
    }
  }, []);

  const handleShowCart = () => setShowCart(!showCart);

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
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo + Título */}
        <div className="flex items-center gap-2">
          <img src="/videojuego.png" alt="Videojuego Icon" className="w-8 h-8" />
          <h1 className="text-xl font-bold">KingGames</h1>
        </div>

        {/* Contenedor de acciones (Carrito, usuario, menú) */}
        <div className="relative flex items-center gap-4">
          {/* Botón del carrito */}
          <button
            className="hover:bg-slate-200/20 rounded-full p-2 text-white flex items-center gap-1"
            onClick={handleShowCart}
          >
            <ShoppingCartIcon />
            <div className="bg-white p-1 text-xs text-gray-900 w-6 h-6 rounded-full flex justify-center items-center">
              <span>{products.length}</span>
            </div>
          </button>

          {/* Carrito desplegable */}
          {showCart && (
            <div className="absolute top-12 right-0 w-max z-50">
              <ShoppingCart />
            </div>
          )}

          {/* Nombre de usuario con ícono blanco */}
          {userName && (
            <div className="flex items-center gap-2 text-sm text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span className="hidden sm:inline">Bienvenido, <strong>{userName}</strong></span>
            </div>
          )}

          {/* Menú de usuario */}
          <UserMenu />
        </div>
      </div>

      {/* Selectores de consola y buscador */}
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
    </header>
  );
}

export default Header;
