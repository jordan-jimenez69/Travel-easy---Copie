import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThreeDots } from 'react-loader-spinner';

export default function NewCategories({ categories }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (categoryId) => {
    router.push(`/categorie/${categoryId}`);
  };

  return (
    <div className="CategoriesGrid">
      {loading ? (
        <div className="loader">
          <ThreeDots color="#d48722" height={80} width={80} />
        </div>
      ) : categories?.length > 0 ? (
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
