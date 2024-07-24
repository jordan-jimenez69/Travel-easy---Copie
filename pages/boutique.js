import NewCategories from "@/composants/boutiques/NewCategories";
import Footer from "@/composants/footer";
import Loader from "@/composants/loader";
import Navbar from "@/composants/navbar";
import { mongooseConnect } from "@/lib/mongoose";
import { Categorie } from "@/models/categorie";
import { useEffect, useState } from "react";

export default function Boutique({ newCategories }) {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // Simule un délai de chargement pour voir le loader
    const timer = setTimeout(() => {
      setCategories(newCategories);
    }, 500); // Ce délai simule le temps de chargement

    return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté
  }, [newCategories]);

  return (
    <>
      <Navbar />

      <div className="title-boutique">
        <h1 className="title">Boutique</h1>
      </div>

      <div>
        {categories === null ? (
          <Loader />
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
