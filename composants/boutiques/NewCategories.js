import { useRouter } from 'next/router';

export default function NewCategories({ categories }) {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/categorie/${categoryId}`);
  };

  return (
    <div className="CategoriesGrid">
      {categories?.length > 0 ? (
        categories.map(categorie => (
          <div key={categorie._id} className="category-card">
            <h3>{categorie.name}</h3>
            <button className='button-catego' onClick={() => handleCategoryClick(categorie._id)}>
              Voir les produits
            </button>
          </div>
        ))
      ) : (
        <div>Aucune catégorie trouvée.</div>
      )}
    </div>
  );
}