import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importamos la navegación

function UserMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // Inicializamos la navegación

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600"
        onClick={() => setShowMenu(!showMenu)}
      >
        Opciones
        <FaChevronDown className={`transition-transform ${showMenu ? "rotate-180" : ""}`} />
      </button>

      {showMenu && (
        <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded w-40 text-gray-700">
          <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer">Contact</li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer">Información</li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
