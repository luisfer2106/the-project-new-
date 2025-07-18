import React, { useEffect, useState } from "react";

//#region API: para el posicionamiento de la captura del usuario logueado
const UserBanner = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("nombre");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  if (!userName) return null;

  return (
    <div className="fixed top-3 right-4 z-50 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
      Bienvenido, <span className="font-semibold">{userName}</span>
    </div>
  );
};
//#endregion END function UserBanner


export default UserBanner;
