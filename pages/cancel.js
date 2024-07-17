import Link from 'next/link';
import { FaTimesCircle } from 'react-icons/fa';

const Cancel = () => {
    return (
        <div className="cancel-container">
            <div className="cancel-icon">
                <FaTimesCircle size={100} color="red" />
            </div>
            <h1 className="cancel-title">Commande annulee</h1>
            <p className="cancel-message">
                Votre commande a ete annulée. Si vous avez des questions, hésitez pas à nous contacter.
            </p>
            <Link href="/panier">
                <button className="cancel-button">Retour au panier</button>
            </Link>
        </div>
    );
};

export default Cancel;
