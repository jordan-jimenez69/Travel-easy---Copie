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
                Votre commande a ete annulee. Si vous avez des questions, hesitez pas à nous contacter.
            </p>
            <Link href="/panier">
                <button className="cancel-button">Retour accueil</button>
            </Link>
        </div>
    );
};

export default Cancel;
