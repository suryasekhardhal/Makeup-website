import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import api from "../../services/api";
import { FaHeart } from "react-icons/fa";



export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const { items } = useSelector((state) => state.wishlist);


const handleLogout = async () => {
  await api.post("/users/logout");
  dispatch(logout());
};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-blush/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex gap-8 text-sm font-medium items-center">
  <Link to="/">Home</Link>
  <Link to="/shop">Shop</Link>

  <Link to="/wishlist" className="relative">
  <FaHeart className="text-xl text-plum" />

  {items.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-plum text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {items.length}
    </span>
  )}
</Link>



  {user ? (
    <>
      <span className="text-plum">
        Hi, {user.name}
      </span>
      <button
        onClick={handleLogout}
        className="text-red-500"
      >
        Logout
      </button>
    </>
  ) : (
    <Link to="/login">Login</Link>
    
  )}
</div>
<Link to="/account">Account</Link>


        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white px-6 pb-6 space-y-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
        </div>
      )}
    </nav>
  );
}
