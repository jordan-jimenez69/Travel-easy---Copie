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
                Votre commande a été passée avec succès. Nous vous enverrons un email de confirmation sous peu.
            </p>
            <Link href="/" passHref>
                <button className="success-button">Retour à l'accueil</button>
            </Link>
        </div>
    );
};

export default Success;
