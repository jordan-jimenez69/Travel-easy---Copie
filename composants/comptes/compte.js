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


    return (
            <div className="container">
                <h1 className="title">Mon Compte</h1>
                <p className="welcome-text">Bienvenue, {user.firstname} {user.name}</p>

                <h2>Mes Commandes</h2>
            {orders.length === 0 ? (
                <p>Aucune commande trouvée.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            Commande ID: {order._id}, Date: {order.createdAt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};