import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-serif text-3xl">Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="pt-32 max-w-6xl mx-auto px-6">
      <h1 className="font-serif text-4xl mb-12">Your Cart</h1>

      <div className="space-y-8">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center justify-between border-b pb-6"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div>
                <h3 className="font-medium text-lg">
                  {item.product.name}
                </h3>

                <p className="text-gray-500">
                  Shade: {item.shade.shadeName}
                </p>

                <p className="text-plum">
                  ₹{item.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={() =>
                  dispatch(
                    updateCartItem({
                      productId: item.product._id,
                      shadeId: item.shade._id,
                      quantity: item.quantity - 1,
                    })
                  )
                }
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  dispatch(
                    updateCartItem({
                      productId: item.product._id,
                      shadeId: item.shade._id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>

              <button
                onClick={() =>
                  dispatch(
                    removeCartItem({
                      productId: item.product._id,
                      shadeId: item.shade._id,
                    })
                  )
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-right">
        <h2 className="text-2xl font-serif">
          Total: ₹{cart.totalPrice}
        </h2>

        <button
  onClick={() => navigate("/checkout")}
  className="mt-6 px-8 py-3 bg-plum text-white rounded-full"
>
  Proceed to Checkout
</button>
      </div>
    </div>
  );
}
