import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/footer.css";
import "@/styles/loading.css";
import "@/styles/success.css";
import "@/styles/cancel.css";
import "@/styles/home/accueil.css";
import "@/styles/home/equipement.css";
import "@/styles/boutique/categorie.css";
import "@/styles/boutique/produit.css";
import "@/styles/compte/login.css";
import "@/styles/compte/register.css";
import "@/styles/compte/compte_user.css";
import "@/styles/paniers/panier.css";

import { UserProvider } from '@/contexts/UserContext';
import { CartProvider } from '@/contexts/CartContext';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider >
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  );
}
