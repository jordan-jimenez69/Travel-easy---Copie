import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import Navbar from '@/composants/navbar';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';

const ProductDetail = ({ product }) => {
    const { addToCart } = useCart();

    const router = useRouter();

    const handleAddToCart = () => {
        addToCart(product);
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
                    <button
                        className='button-product-detail'
                        onClick={handleAddToCart}>Ajouté au panier</button>
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
