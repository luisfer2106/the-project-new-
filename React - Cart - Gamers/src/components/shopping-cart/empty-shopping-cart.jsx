import { useState, useEffect } from "react";

export default function EmptyShoppingCart() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white p-4 rounded-lg border shadow-lg ${!visible ? 'hidden' : ''}`}>
      <h5 className="text-lg font-medium border-b">Tu carrito está vacío.</h5>
    </div>
  );
}
