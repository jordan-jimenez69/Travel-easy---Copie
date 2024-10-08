import React, { useContext, useEffect, useState } from 'react';
import UserContext from '@/contexts/UserContext';

export default function Compte() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                const response = await fetch(`/api/userOrders?userId=${user._id}`);
                if (response.ok) {
                    const ordersData = await response.json();
                    setOrders(ordersData);
                }
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) return null;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <section className='compte-page-section'>
            <div className="container-compte">
                <h1 className="title">Mon Compte</h1>
                <p className="welcome-text">Bienvenue, {user.firstname} {user.name}</p>

                <h2 className='ordersTitle'>Mes Commandes</h2>
                {orders.length === 0 ? (
                    <p>Aucune commande trouvée.</p>
                ) : (
                    <ul className='ordersList'>
                        {orders.map(order => (
                            <li key={order._id} className='orderItem'>
                                <p><strong>Numéro de commande:</strong> {order._id}</p>
                                <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                                <ul className='ordersList'>
                                    {order.products.map((product, index) => (
                                        <li
                                            key={index}
                                            className='productItem'
                                        >
                                            <p><strong>Nom:</strong> {product.name}</p>
                                            <div className='compte-qpt'>
                                                <p><strong>Quantité:</strong> {product.quantity}</p>
                                                <p><strong>Prix:</strong> {product.price}€</p>
                                                <p><strong>Taille:</strong> {product.size}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}