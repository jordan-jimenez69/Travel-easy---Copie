import Footer from "@/composants/footer";
import Navbar from "@/composants/navbar";
import CheckoutForm from "@/composants/paniers/CheckOutForm";
import Page_Panier from "@/composants/paniers/panier";


export default function Panier() {
  return (

    <>
        <Navbar />

      <div className="Panier-assemble">
        <Page_Panier />
        <CheckoutForm />
      </div>

      <Footer />
    </>
  );
}