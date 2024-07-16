import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    const addToCart = (product) => {
        const productIndex = cartProducts.findIndex(item => item._id === product._id);
        if (productIndex !== -1) {
            const updatedCart = [...cartProducts];
            updatedCart[productIndex].quantity += 1;
            setCartProducts(updatedCart);
        } else {
            setCartProducts(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartProducts((prevCart) => prevCart.filter(product => product._id !== productId));

        if (cartProducts.length === 1) {
            ls?.removeItem('cart');
        }
    };

    const clearCart = () => {
        setCartProducts([]);
    };

//augmenter de 1 quantité
    const increaseQuantity = (productId) => {
        setCartProducts(prevCart =>
            prevCart.map(product =>
                product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

//baisser de 1 quantité
    const decreaseQuantity = (productId) => {
        setCartProducts(prevCart =>
            prevCart.map(product =>
                product._id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartProducts, addToCart, removeFromCart, clearCart, setCartProducts, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
