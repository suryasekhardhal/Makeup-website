import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshSession } from "./features/auth/authSlice";
import Checkout from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Wishlist from "./pages/Wishlist";
import { fetchWishlist } from "./features/wishlist/wishlistSlice";



function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refreshSession());
  // }, [dispatch]);

  useEffect(() => {
  dispatch(refreshSession()).then(() => {
    dispatch(fetchWishlist());
  });
}, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success/:orderId"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/shop" element={<Shop />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
