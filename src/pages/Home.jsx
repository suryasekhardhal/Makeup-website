import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/products/ProductCard";





export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          alt="Beauty"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-nude/80 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative text-center max-w-3xl px-6 animate-fadeIn">
        <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
          Define Your Glow
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Discover high-performance beauty crafted to enhance your natural radiance.
          <br />
          Minimal. Modern. Made for you.
        </p>



        <div className="flex justify-center gap-6 flex-wrap">
          <button className="px-8 py-3 from-plum to-[#8c5c6b] text-white rounded-full shadow-md hover:opacity-90 transition duration-300">
            Shop Now
          </button>

          <button className="px-8 py-3 border border-plum text-plum rounded-full hover:bg-plum hover:text-white transition duration-300">
            Explore Collection
          </button>
        </div>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-4xl mb-12 text-center">
              Featured Products
            </h2>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {items.slice(0, 3).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

    </section>

  );
}
