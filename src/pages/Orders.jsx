import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/orders/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  if (!items.length) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-serif text-3xl">No Orders Yet</h2>
      </div>
    );
  }

  return (
    <div className="pt-32 max-w-6xl mx-auto px-6">
      <h1 className="font-serif text-4xl mb-10">My Orders</h1>

      <div className="space-y-8">
        {items.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">
                Order ID: {order._id}
              </span>

              <span className="text-plum">
                {order.orderStatus}
              </span>
            </div>

            <p className="mb-2">
              Total: ₹{order.totalPrice}
            </p>

            <p className="text-sm text-gray-500">
              Payment: {order.paymentStatus}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
