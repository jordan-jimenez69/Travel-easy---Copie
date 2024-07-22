import Link from "next/link";

export default function Footer() {
    return (

        <footer>
            <div class="footer-container">
                <div class="footer-links">
                    <Link href="/footer/conditions">Conditions d'utilisation</Link>
                    <Link href="/footer/privacy">Politique de confidentialité</Link>
                    <Link href="/footer/contact">Contact</Link>
                </div>
                <div class="footer-copyright">
                    &copy; 2024 Nom de votre site. Tous droits réservés.
                </div>
            </div>
        </footer>

    )
};
