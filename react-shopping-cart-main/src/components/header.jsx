import { useState } from "react";
import { ShoppingCartIcon } from "./icons";
import { useShoppingCart } from "../hooks";
import ShoppingCart from "./shopping-cart";
import dataProducts from "../data.json";
import UserMenu from "./UserMenu"; // Importamos el nuevo menú de usuario

function Header({ setFilteredProducts, setSearchTerm }) {
  const [showCart, setShowCart] = useState(false);
  const { products } = useShoppingCart();
  const [selectedGame, setSelectedGame] = useState("");

  const handleShowCart = () => setShowCart(!showCart);

  const filterGameById = (id) => {
    setSelectedGame(id);
    setFilteredProducts(id === "" ? dataProducts : dataProducts.filter((product) => product.id === id));
  };

  return (
    <header className="w-full sticky top-0 header-custom">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="responsive-container">
          <img src="/videojuego.png" alt="Videojuego Icon" className="w-8 h-8" />
          <h1 className="custom-title">KingGames</h1>
        </div>
        
        {/* Contenedor del carrito y menú de usuario */}
        <div className="relative flex items-center gap-4">
          {/* Botón del carrito */}
          <button
            className="hover:bg-slate-200/20 rounded-full p-2 text-white flex items-center gap-1"
            onClick={handleShowCart}
          >
            <ShoppingCartIcon />
            <div className="bg-white p-1 text-xs text-gray-900 w-6 h-6 rounded-[50%]">
              <span>{products.length}</span>
            </div>
          </button>
          {showCart && (
            <div className="absolute top-12 right-0 w-max">
              <ShoppingCart />
            </div>
          )}
          
          {/* Menú de usuario */}
          <UserMenu />
        </div>
      </div>

      {/* Barra de selección de juegos y buscador */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col items-center">
        <div className="select-container flex gap-4 mb-2 w-full justify-center">
          {["PS5", "PS4", "XBOX", "PC"].map((platform) => (
            <select className="custom-select" value={selectedGame} onChange={(e) => filterGameById(e.target.value)} key={platform}>
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
