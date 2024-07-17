import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
    return (
        <div className="success-container">
            <div className="success-icon">
                <FaCheckCircle size={100} color="green" />
            </div>
            <h1 className="success-title">Merci pour votre commande !</h1>
            <p className="success-message">
                Votre commande a ete passée avec succès.
            </p>
            <Link href="/compte">
                <button className="success-button">Retour a votre compte</button>
            </Link>
        </div>
    );
};

export default Success;
