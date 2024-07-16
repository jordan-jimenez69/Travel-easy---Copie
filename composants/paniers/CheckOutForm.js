import { CartContext } from '@/contexts/CartContext';
import React, { useContext, useState } from 'react';

const CheckoutForm = () => {
    const { cartProducts, clearCart  } = useContext(CartContext);
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [ville, setVille] = useState('');
    const [codePost, setCodePost] = useState('');
    const [adresse, setAdresse] = useState('');
    const [pays, setPays] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstname || !name || !ville || !codePost || !adresse || !pays || cartProducts.length === 0) {
            console.error('Missing required fields');
            return;
        }

        const products = cartProducts.map(product => product._id);

        const orderData = {
            firstname,
            name,
            ville,
            codePost,
            adresse,
            pays,
            products
        };

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
                window.location.href = data.url;
                localStorage.clear();
            } else {
                const errorData = await response.json();
                console.error('Error creating order:', errorData);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="chekout-container">
            <h2>Vos Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="chekout-form-group">
                    <label htmlFor="firstname">Prénom:</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div className="chekout-form-group">
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="chekout-form-group">
                    <label htmlFor="ville">Ville:</label>
                    <input
                        type="text"
                        id="ville"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        required
                    />
                </div>
                <div className="chekout-form-group">
                    <label htmlFor="codePost">Code Postal:</label>
                    <input
                        type="text"
                        id="codePost"
                        value={codePost}
                        onChange={(e) => setCodePost(e.target.value)}
                        required
                    />
                </div>
                <div className="chekout-form-group">
                    <label htmlFor="adresse">Adresse Postale:</label>
                    <input
                        type="text"
                        id="adresse"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        required
                    />
                </div>
                <div className="chekout-form-group">
                    <label htmlFor="pays">Pays:</label>
                    <input
                        type="text"
                        id="pays"
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-btn btn-primary">Continuer vers payement</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
