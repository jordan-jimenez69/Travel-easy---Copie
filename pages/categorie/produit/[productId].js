import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import Navbar from '@/composants/navbar';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ProductDetail = ({ product }) => {
    const { addToCart } = useCart();
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState('');
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        if (product.proprietes && Array.isArray(product.proprietes.Taille)) {
            setSizes(product.proprietes.Taille);
        } else if (product.proprietes && product.proprietes.Taille) {
            setSizes([product.proprietes.Taille]);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (product.categorie === '6634eed756190cda6353ef11' && !selectedSize) {
            alert('Veuillez sélectionner une taille.');
            return;
        }

        const cartItem = {
            ...product,
            selectedSize: selectedSize || 'default'
        };

        addToCart(cartItem);
        router.push('/panier');
    };

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='product-details'>
                <h1 className='product-title'>{product.title}</h1>
                <div className='decription-img-product'>
                    {product.images && product.images.length > 0 && (
                        <img src={product.images[0]} alt={product.title} className="product-image-detail" />
                    )}
                    <p className='product-description'>Description : {product.description}</p>
                </div>

                <div className='product-price-btn'>
                    <p className='product-price-detail'>Prix: {product.price}€</p>
                    {sizes.length > 0 && (
                        <div className='size'>
                            <label htmlFor="size">Taille :</label>
                            <select
                                id="size"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="">Sélectionnez une taille</option>
                                {sizes.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button className='button-product-detail' onClick={handleAddToCart}>Ajouter au Panier</button>
                </div>
            </div>
        </>
    );
};


export async function getServerSideProps(context) {
    const { productId } = context.params;
    await mongooseConnect();

    const product = await Produit.findById(productId);
    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}

export default ProductDetail;
