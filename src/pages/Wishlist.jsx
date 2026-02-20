import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../features/wishlist/wishlistSlice";
import ProductCard from "../components/products/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function Wishlist() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (!items.length) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-serif text-3xl">Your Wishlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl mb-10">Wishlist</h1>


      

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
