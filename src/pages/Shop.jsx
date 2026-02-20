import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/products/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function Shop() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl mb-10">Shop</h1>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-96 p-3 border rounded-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} height={350} />
    ))}
  </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
