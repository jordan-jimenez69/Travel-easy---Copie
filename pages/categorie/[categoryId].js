import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { mongooseConnect } from '@/lib/mongoose';
import { Produit } from '@/models/produit';
import { Categorie } from '@/models/categorie';
import Navbar from '@/composants/navbar';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryProducts = ({ initialProducts, categoryName, categoryId, properties }) => {

  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProduct, setAnimationProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAnimationProduct(product);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setAnimationProduct(null);
    }, 1000); // Durée de l'animation
  };

  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleProductClick = (categoryId, productId) => {
    router.push(`/categorie/produit/${productId}`);
  };

  const handleFilterChange = (property, value) => {
    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      newFilters[property] = value;
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = initialProducts;
      for (const property in selectedFilters) {
        if (selectedFilters[property] !== 'Tous') {
          filtered = filtered.filter(product => product.proprietes[property] === selectedFilters[property]);
        }
      }
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [selectedFilters, initialProducts]);

  return (
    <div>
      <Navbar />
      <div className="Filters">
        <h1 className='Title-Product'>Produits pour la catégorie: {categoryName}</h1>
        {properties.map(property => (
          <div key={property.name} className="Filter">
            <h3>{property.name}</h3>
            <select
              value={selectedFilters[property.name] || 'Tous'}
              onChange={(e) => handleFilterChange(property.name, e.target.value)}
            >
              <option value="Tous">Tous</option>
              {property.values.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
        <button onClick={handleResetFilters} className="reset-button">Réinitialiser les filtres</button>
      </div>
      {filteredProducts.length === 0 && (
        <div className='filtre_nodispo'>
          <p>Pas de produit disponible avec les filtres sélectionnés.</p>
        </div>
      )}
      <div className="ProductsGrid">
        {filteredProducts.map(product => (
          <div key={product._id} className="category-card">
            <h3>{product.title}</h3>
            <div>
              {product.images && product.images.length > 0 && (
                <img src={product.images[0]} alt={product.title} className="product-image" />
              )} </div>

            <div className='panier-voirProduit'>
              <button className='button-catego-product' onClick={() => handleProductClick(categoryId, product._id)}>
                Voir le produit
              </button>
              <div className='button-catego-panier' onClick={() => handleAddToCart(product)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </div>
            </div>
            {isAnimating && animationProduct === product && (
              <AnimatePresence>
                <motion.div
                  className='added-to-cart-badge'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  Produit ajouté au panier!
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { categoryId } = context.params;
  await mongooseConnect();

  const category = await Categorie.findById(categoryId);
  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = await Produit.find({ categorie: categoryId });
  const properties = category.proprietes;

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
      categoryName: category.name,
      categoryId,
      properties: JSON.parse(JSON.stringify(properties)),
    },
  };
}

export default CategoryProducts;
