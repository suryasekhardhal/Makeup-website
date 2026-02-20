import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";



export default function ProductCard({ product }) {
  const dispatch = useDispatch();
const { items } = useSelector((state) => state.wishlist);

const isInWishlist = items.some((item) => item._id === product._id);

const handleWishlistToggle = async () => {
  if (isInWishlist) {
    await dispatch(removeFromWishlist(product._id));
    toast.success("Removed from wishlist");
  } else {
    await dispatch(addToWishlist(product._id));
    toast.success("Added to wishlist");
  }
};


  return (
    <div className=" relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handleWishlistToggle}>
  {isInWishlist ? (
    <FaHeart
  className={`text-xl transition-transform duration-300 ${
    isInWishlist ? "scale-110 text-plum" : "text-gray-400"
  }`}
/>
  ) : (
    <FaRegHeart className="text-gray-400 text-xl" />
  )}
</div>

      <img
        loading="lazy"
        src={product.images[0]}
        alt={product.name}
        className="w-full h-80 object-cover"
      />

      <div className="p-6">
        <h3 className="font-medium text-lg mb-2">
          {product.name}
        </h3>

        <p className="text-gray-500 mb-4">
          ₹{product.discountedPrice || product.basePrice}
        </p>

        <Link
          to={`/product/${product.slug}`}
          className="text-plum font-medium"
        >
          View Product →
        </Link>
      </div>
    </div>
  );
}
