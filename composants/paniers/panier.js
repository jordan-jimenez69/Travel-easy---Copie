import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';

const Page_Panier = () => {
    const { cartProducts, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    const router = useRouter();

    const handleRemove = (productId) => {
        if (window.confirm("Êtes-vous sûr de vouloir Supprimer le produit ?")) {
            removeFromCart(productId);
        };
    };

    const handleIncreaseQuantity = (productId) => {
        increaseQuantity(productId);
    };

    const handleDecreaseQuantity = (productId) => {
        decreaseQuantity(productId);
    };

    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleCheckout = () => {
        router.push('/commander');
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
                            <div key={index} className='cart-item'>
                                <div className='image-panier'>
                                    {product.images && product.images.length > 0 && (
                                        <img src={product.images[0]} alt={product.title} />
                                    )}
                                </div>
                                <div className='product-info'>
                                    <h2 className='product-title'>{product.title}</h2>
                                    <p className='product-price'>Prix: {product.price}€</p>
                                </div>
                                <div className="quantity-controls">
                                    <p className='product-title-quant'>Quantité:</p>
                                    <button className='quantity-button' onClick={() => handleDecreaseQuantity(product._id)}>-</button>
                                    <p> {product.quantity}</p>
                                    <button className='quantity-button' onClick={() => handleIncreaseQuantity(product._id)}>+</button>
                                </div>
                                <button className='remove-button' onClick={() => handleRemove(product._id)}>Supprimer</button>
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
