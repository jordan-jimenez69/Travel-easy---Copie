import NewCategories from "@/composants/boutiques/NewCategories";
import Footer from "@/composants/footer";
import Loader from "@/composants/loader";
import Navbar from "@/composants/navbar";
import { mongooseConnect } from "@/lib/mongoose";
import { Categorie } from "@/models/categorie";
import { useEffect, useState } from "react";

export default function Boutique({ newCategories }) {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    // Simuler un délai de chargement pour observer le loader
    const timer = setTimeout(() => {
      setCategories(newCategories);
      setLoading(false); // Les données sont maintenant chargées
    }, 500); // Ajustez le délai selon vos besoins

    return () => clearTimeout(timer); // Nettoyer le timer au démontage
  }, [newCategories]);

  return (
    <>
      <Navbar />

      <div className="title-boutique">
        <h1 className="title">Boutique</h1>
      </div>

      <div className="content">
        {loading ? (
          <Loader /> // Affiche le loader pendant le chargement
        ) : (
          <NewCategories categories={categories} />
        )}
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newCategories = await Categorie.find({}, null, { sort: { '_id': -1 } });

  return {
    props: {
      newCategories: JSON.parse(JSON.stringify(newCategories)),
    },
  };
}
