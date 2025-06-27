import React, { useContext, useEffect, useState } from 'react';
import UserContext from '@/contexts/UserContext';

export default function Compte() {
    const [orders, setOrders] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        _id: '', // Ajout de l'ID utilisateur
        firstname: '',
        name: '',
        email: '',
        password: '', // Nouveau champ pour le mot de passe
        password: '',
        adresse: '',
        ville: '',
        codePost: '',
        pays: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                _id: user._id, // Stocker l'ID pour la mise à jour
                firstname: user.firstname,
                name: user.name,
                email: user.email,
                password: '', // Champ laissé vide pour éviter de l'afficher
                adresse: user.adresse,
                ville: user.ville,
                codePost: user.codePost,
                pays: user.pays,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const saveChanges = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
                alert('Vos informations ont été mises à jour avec succès !');
            } else {
                alert('Une erreur est survenue lors de la mise à jour.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
            alert('Une erreur serveur est survenue.');
        }
    };

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
        <section className="compte-page-section">
            <div className="container-compte">
                <h1 className="title">Mon Compte</h1>
                <p className="welcome-text">Bienvenue, {user.firstname} {user.name}</p>

                <div className="container-compte">
                    <h2 className="ordersTitle">Vos informations</h2>
                    {isEditing ? (

                        <div>
                            <label>
                                Prénom :
                                <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} />
                            </label>
                            <label>
                                Nom :
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                Adresse-mail :
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </label>
                            <label>
                                Adresse :
                                <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} />
                            </label>
                            <label>
                                Ville :
                                <input type="text" name="ville" value={formData.ville} onChange={handleInputChange} />
                            </label>
                            <label>
                                Code postal :
                                <input type="text" name="codePost" value={formData.codePost} onChange={handleInputChange} />
                            </label>
                            <label>
                                Pays :
                                <input type="text" name="pays" value={formData.pays} onChange={handleInputChange} />
                            </label>
                            <label>
                                Mot de passe (laisser vide si inchangé) :
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                            </label>
                            <div className="btn-container">
                                <button className="btn-save-compte" onClick={saveChanges}>Enregistrer</button>
                                <button className="cancel-btn-compte" onClick={() => setIsEditing(false)}>Annuler</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Prénom :</strong> {user.firstname}</p>
                            <p><strong>Nom :</strong> {user.name}</p>
                            <p><strong>Adresse-mail :</strong> {user.email}</p>
                            <p><strong>Adresse :</strong> {user.adresse}</p>
                            <p><strong>Ville :</strong> {user.ville}</p>
                            <p><strong>Code postal :</strong> {user.codePost}</p>
                            <p><strong>Pays :</strong> {user.pays}</p>
                            <button className="btn-save-compte" onClick={() => setIsEditing(true)}>Modifier</button>
                        </div>
                    )}

                </div>


                <h2 className="ordersTitle">Mes Commandes</h2>
                {orders.length === 0 ? (
                    <p>Aucune commande trouvée.</p>
                ) : (
                    <ul className="ordersList">
                        {orders.map(order => (
                            <li key={order._id} className="orderItem">
                                <p><strong>Numéro de commande :</strong> {order._id}</p>
                                <ul className="ordersList">
                                    {order.products.map((product, index) => (
                                        <li key={index} className="productItem">
                                            <p><strong>Nom :</strong> {product.name}</p>
                                            <div className="compte-qpt">
                                                <p><strong>Quantité :</strong> {product.quantity}</p>
                                                <p><strong>Prix :</strong> {product.price}€</p>
                                                <p><strong>Taille :</strong> {product.size}</p>
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