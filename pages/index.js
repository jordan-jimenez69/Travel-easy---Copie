import Accueil from "@/composants/accueil";
import Equipement from "@/composants/equipements";
import Navbar from "@/composants/navbar";

export default function Home() {
  return (

    <>
      <div className="">
        <Navbar />
      </div>

      <div className="">
        <Accueil />
      </div>

      <div className="">
        <Equipement />
      </div>

    </>
  );
}
