import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-nude px-6">
      <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg">
        <h1 className="font-serif text-4xl mb-6">
          Order Confirmed ✨
        </h1>

        <p className="text-gray-600 mb-4">
          Thank you for shopping with Saradya.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Order ID: {orderId}
        </p>

        <Link
          to="/orders"
          className="px-8 py-3 bg-plum text-white rounded-full"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}
