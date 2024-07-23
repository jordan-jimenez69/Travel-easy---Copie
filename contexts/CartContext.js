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
        const productIndex = cartProducts.findIndex(
            item => item._id === product._id && item.selectedSize === product.selectedSize
        );

        if (productIndex !== -1) {
            const updatedCart = [...cartProducts];
            updatedCart[productIndex].quantity += 1;
            setCartProducts(updatedCart);
        } else {
            setCartProducts(prevCart => [
                ...prevCart,
                { ...product, quantity: 1 }
            ]);
        }
    };


    const removeFromCart = (productId, selectedSize) => {
        setCartProducts(prevCart =>
            prevCart.filter(product =>
                !(product._id === productId && product.selectedSize === selectedSize)
            )
        );
        if (cartProducts.length === 1) {
            ls?.removeItem('cart');
        }
    };

    //augmenter de 1 quantité
    const increaseQuantity = (productId, selectedSize) => {
        setCartProducts(prevCart =>
            prevCart.map(product =>
                product._id === productId && product.selectedSize === selectedSize
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    //baisser de 1 quantité
    const decreaseQuantity = (productId, selectedSize) => {
        setCartProducts(prevCart =>
            prevCart.map(product =>
                product._id === productId && product.selectedSize === selectedSize && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const updateSize = (productId, oldSize, newSize) => {
        setCartProducts(prevCart => {
            const updatedCart = prevCart.map(product => {
                if (product._id === productId && product.selectedSize === oldSize) {
                    return { ...product, selectedSize: newSize };
                }
                return product;
            });

            // Merge products with the same ID and new size
            const mergedCart = updatedCart.reduce((acc, currentProduct) => {
                const existingProductIndex = acc.findIndex(product => product._id === currentProduct._id && product.selectedSize === currentProduct.selectedSize);
                if (existingProductIndex !== -1) {
                    acc[existingProductIndex].quantity += currentProduct.quantity;
                } else {
                    acc.push(currentProduct);
                }
                return acc;
            }, []);

            return mergedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cartProducts, updateSize, addToCart, removeFromCart, setCartProducts, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
