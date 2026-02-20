import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(form)).unwrap();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nude">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-sm w-96"
      >
        <h2 className="font-serif text-3xl mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full py-3 bg-plum bg-blue-700 text-white rounded-full">
          Login
        </button>
      </form>
    </div>
  );
}
