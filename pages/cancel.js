import Link from 'next/link';
import { FaTimesCircle } from 'react-icons/fa';

const Cancel = () => {
    return (
        <div className="cancel-container">
            <div className="cancel-icon">
                <FaTimesCircle size={100} color="red" />
            </div>
            <h1 className="cancel-title">Commande annulée</h1>
            <p className="cancel-message">
                Votre commande a été annulée. Si vous avez des questions, n'hésitez pas à nous contacter.
            </p>
            <Link href="/panier">
                <button className="cancel-button">Retour à l'accueil</button>
            </Link>
        </div>
    );
};

export default Cancel;
