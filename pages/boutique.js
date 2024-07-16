import NewCategories from "@/composants/boutiques/NewCategories";
import Navbar from "@/composants/navbar";
import { mongooseConnect } from "@/lib/mongoose";
import { Categorie } from "@/models/categorie";

export default function boutique({ newCategories }) {
  console.log({ newCategories })
  return (

    <>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <h1>Boutique</h1> <br />
      </div>

      <div>
        <NewCategories categories={newCategories} />
      </div>

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