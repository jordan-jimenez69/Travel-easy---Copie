import Accueil from "@/composants/accueil";
import Equipement from "@/composants/equipements";
import Footer from "@/composants/footer";
import Navbar from "@/composants/navbar";

export default function Home() {
  return (

    <>
      <Navbar />

      <Accueil />

      <Equipement />

      <Footer />
    </>
  );
}
