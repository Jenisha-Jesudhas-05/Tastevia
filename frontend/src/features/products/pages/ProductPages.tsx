import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

const ProductPages: React.FC = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading products...
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Our Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrls={product.imageUrls}
            category={product.category}
          />
        ))}

      </div>
    </div>
  );
};

export default ProductPages;