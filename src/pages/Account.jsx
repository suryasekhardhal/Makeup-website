import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Account() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="pt-32 max-w-5xl mx-auto px-6">
      <h1 className="font-serif text-4xl mb-10">My Account</h1>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-xl font-medium">
            {user?.name}
          </h2>
          <p className="text-gray-500">
            {user?.email}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/orders"
            className="p-6 border rounded-xl hover:bg-nude transition"
          >
            My Orders
          </Link>

          <Link
            to="/wishlist"
            className="p-6 border rounded-xl hover:bg-nude transition"
          >
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
}
