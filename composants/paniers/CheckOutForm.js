import { CartContext } from '@/contexts/CartContext';
import UserContext from '@/contexts/UserContext';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'; // Pour gérer la redirection

const CheckoutForm = () => {
    const { cartProducts, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [ville, setVille] = useState('');
    const [codePost, setCodePost] = useState('');
    const [adresse, setAdresse] = useState('');
    const [pays, setPays] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const calculateTotal = () => {
        return cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const validateForm = () => {
        if (!firstname || !name || !ville || !codePost || !adresse || !pays) {
            setErrorMessage('Tous les champs sont requis.');
            return false;
        }
        if (cartProducts.length === 0) {
            setErrorMessage('Votre panier est vide.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const products = cartProducts.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            size: product.selectedSize // Incluez la taille sélectionnée
        }));

        const orderData = {
            firstname,
            name,
            ville,
            codePost,
            adresse,
            pays,
            products,
            userId: user._id,
            total: calculateTotal(),
        };

        setLoading(true);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.url; // Redirection vers la page de paiement
                clearCart();
            } else {
                const errorData = await response.json();
                setErrorMessage(`Erreur lors de la création de la commande: ${errorData.message}`);
            }
        } catch (error) {
            setErrorMessage('Une erreur est survenue lors de la création de la commande.');
        } finally {
            setLoading(false);
        }
    };

    // Si l'utilisateur n'est pas connecté, affichez un message ou redirigez vers la page de connexion
    if (!user) {
        return (
            <div className="checkout-container">
                <h2>Vous n'êtes pas connecté</h2>
                <p>Pour procéder au paiement, veuillez vous connecter ou créer un compte.</p>
                <div className="checkout-noregi">
                    <button className="btn btn-primary" onClick={() => router.push('/register')}>Créer un compte</button>
                    <button className="btn btn-primary" onClick={() => router.push('/login')}>Se connecter</button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Vos Informations</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="checkout-form-group">
                    <label htmlFor="firstname">Prénom:</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="ville">Ville:</label>
                    <input
                        type="text"
                        id="ville"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        required
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="codePost">Code Postal:</label>
                    <input
                        type="text"
                        id="codePost"
                        value={codePost}
                        onChange={(e) => setCodePost(e.target.value)}
                        required
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="adresse">Adresse Postale:</label>
                    <input
                        type="text"
                        id="adresse"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                    />
                </div>
                <div className="checkout-form-group">
                    <label htmlFor="pays">Pays:</label>
                    <input
                        type="text"
                        id="pays"
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-btn btn-primary" disabled={loading}>
                    {loading ? 'Traitement...' : 'Continuer vers paiement'}
                </button>
            </form>
            <h3 className='total-prod-quant'>Total: {calculateTotal().toFixed(2)}€</h3>
        </div>
    );
};

export default CheckoutForm;
