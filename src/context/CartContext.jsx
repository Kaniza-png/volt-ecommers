import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('volt_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('volt_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color) => {
    const selectedColor = color || product.colors[0].name;
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.id === product.id && item.color === selectedColor
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, color: selectedColor, qty: 1 }];
    });
  };

  const updateQty = (id, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.color === color
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id, color) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.color === color))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isFreeShipping = subtotal >= 500000;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);