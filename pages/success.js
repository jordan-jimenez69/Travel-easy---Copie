import Link from 'next/link';

export default function Success() {
    return (
        <div>
            <h1>Paiement réussi !</h1>
            <p>Merci pour votre achat.</p>
            <Link href="/compte">
                <button style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Retour au Menu Compte
                </button>
            </Link>
        </div>
    );
}
