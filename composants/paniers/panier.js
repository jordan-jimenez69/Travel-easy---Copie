import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';

const Page_Panier = () => {
    const { cartProducts, removeFromCart, increaseQuantity, decreaseQuantity, updateSize } = useCart();

    const router = useRouter();

    const handleRemove = (productId, selectedSize) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer le produit ?")) {
            removeFromCart(productId, selectedSize);
        }
    };

    const handleIncreaseQuantity = (productId, selectedSize) => {
        increaseQuantity(productId, selectedSize);
    };

    const handleDecreaseQuantity = (productId, selectedSize) => {
        decreaseQuantity(productId, selectedSize);
    };

    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleSizeChange = (productId, oldSize, newSize) => {
        updateSize(productId, oldSize, newSize);
    };

    return (
        <div className="cart-container">
            <h1 className='title-page'>Votre Panier</h1>
            <div>
                {cartProducts.length === 0 ? (
                    <p className='title-page'>Votre panier est vide.</p>
                ) : (
                    <>
                        {cartProducts.map((product, index) => (
                            <div key={`${product._id}-${product.selectedSize}`} className='cart-item'>
                                <div className='image-panier'>
                                    {product.images && product.images.length > 0 && (
                                        <img src={product.images[0]} alt={product.title} />
                                    )}
                                </div>
                                <div className='product-info'>
                                    <h2 className='product-title'>{product.title}</h2>
                                    <p className='product-price'>Prix: {product.price}€</p>
                                    {Array.isArray(product.proprietes.Taille) && product.proprietes.Taille.length > 0 ? (
                                        <div className='taille-chaussure-edit'>
                                            <label htmlFor={`size-${product._id}-${index}`}>Taille :</label>
                                            <select
                                                id={`size-${product._id}-${index}`}
                                                value={product.selectedSize}
                                                onChange={(e) => handleSizeChange(product._id, product.selectedSize, e.target.value)}
                                            >
                                                {product.proprietes.Taille.map((size) => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <p>Taille universelle</p>
                                    )}
                                </div>
                                <div className="quantity-controls">
                                    <p className='product-title-quant'>Quantité:</p>
                                    <button className='quantity-button' onClick={() => handleDecreaseQuantity(product._id, product.selectedSize)}>-</button>
                                    <p>{product.quantity}</p>
                                    <button className='quantity-button' onClick={() => handleIncreaseQuantity(product._id, product.selectedSize)}>+</button>
                                </div>
                                <button className='remove-button' onClick={() => handleRemove(product._id, product.selectedSize)}>Supprimer</button>
                            </div>
                        ))}

                        <div className="total-container">
                            <h2>Total: {calculateTotalPrice()}€</h2>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page_Panier;
