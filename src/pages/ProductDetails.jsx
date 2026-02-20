import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "../features/products/productSlice";
import { fetchShadesByProduct } from "../features/products/shadeSlice";
import { useState } from "react";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";



export default function ProductDetails() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading } = useSelector((state) => state.products);
    const { items: shades } = useSelector((state) => state.shades);
    const [selectedShade, setSelectedShade] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProductBySlug(slug));
    }, [dispatch, slug]);
    useEffect(() => {
        if (selectedProduct?._id) {
            dispatch(fetchShadesByProduct(selectedProduct._id));
        }
    }, [dispatch, selectedProduct]);

    if (loading || !selectedProduct) {
        return <div className="pt-32 text-center">Loading...</div>;
    }

    const handleAddToCart = async () => {
        if (!selectedShade) {
            alert("Please select a shade");
            return;
        }

        try {
            await dispatch(
                addToCart({
                    productId: selectedProduct._id,
                    shadeId: selectedShade._id,
                    quantity,
                })
            ).unwrap();

            alert("Added to cart successfully!");
        } catch (error) {
            alert(error);
        }
    };

    const handleBuyNow = async () => {
        if (!selectedShade) {
            alert("Please select a shade");
            return;
        }

        try {
            await dispatch(
                addToCart({
                    productId: selectedProduct._id,
                    shadeId: selectedShade._id,
                    quantity,
                })
            ).unwrap();

            navigate("/checkout");
        } catch (error) {
            alert(error);
        }
    };



    return (
        <div className="pt-32 px-6 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">

                {/* Image */}
                <div>
                    <img
                        src={selectedProduct.images[0]}
                        alt={selectedProduct.name}
                        className="w-full rounded-2xl shadow-sm"
                    />
                </div>

                {/* Info */}
                <div>
                    <h1 className="font-serif text-4xl mb-4">
                        {selectedProduct.name}
                    </h1>

                    <p className="text-plum text-2xl mb-6">
                        ₹{selectedProduct.discountedPrice || selectedProduct.basePrice}
                    </p>

                    <div className="mb-6">
                        <h3 className="font-medium mb-3">Select Shade</h3>
                        <div className="flex gap-4 flex-wrap">
                            {console.log(shades)}

                            {shades.map((shade) => (
                                <button
                                    key={shade._id}
                                    onClick={() => setSelectedShade(shade)}
                                    className={`w-10 h-10 rounded-full border-2 transition ${selectedShade?._id === shade._id
                                        ? "border-plum scale-110"
                                        : "border-gray-300"
                                        }`}
                                    style={{ backgroundColor: shade.shadeCode }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="px-3 py-1 border rounded"
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="px-3 py-1 border rounded"
                        >
                            +
                        </button>
                    </div>



                    <p className="text-gray-600 mb-6">
                        {selectedProduct.description}
                    </p>

                    <div className="flex flex-col gap-4 mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="px-8 py-3 bg-plum text-black rounded-full hover:opacity-90 transition"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="px-8 py-3 border border-plum text-plum rounded-full hover:bg-plum hover:text-white transition"
                        >
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>

            {/* Extra Sections */}
            <div className="mt-20">
                <h2 className="font-serif text-2xl mb-4">Ingredients</h2>
                <ul className="list-disc ml-6 text-gray-600">
                    {selectedProduct.ingredients?.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-12">
                <h2 className="font-serif text-2xl mb-4">How To Use</h2>
                <p className="text-gray-600">{selectedProduct.howToUse}</p>
            </div>
        </div>
    );
}
