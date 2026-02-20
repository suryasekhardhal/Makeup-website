import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handlePlaceOrder = async () => {
    try {
      const { data } = await api.post("/orders/orders", {
        shippingAddress: address,
        paymentMethod,
      });

      const order = data.data;

      if (paymentMethod === "cod") {
        navigate(`/order-success/${order._id}`);
      } else {
        await initiatePayment(order._id);
      }

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const initiatePayment = async (orderId) => {
   const { data } = await api.post(
  `/orders/orders/${orderId}/initiate-payment`,
  { orderId }   // 👈 send in body too
);
    
    const options = {
      key: data.data.key,
      amount: data.data.amount,
      currency: data.data.currency,
      order_id: data.data.gatewayOrderId,
      handler: function () {
        navigate(`/order-success/${orderId}`);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="pt-32 max-w-4xl mx-auto px-6">
      <h1 className="font-serif text-4xl mb-10">Checkout</h1>

      <div className="space-y-4">
        {Object.keys(address).map((field) => (
          <input
            key={field}
            placeholder={field}
            className="w-full p-3 border rounded"
            onChange={(e) =>
              setAddress({ ...address, [field]: e.target.value })
            }
          />
        ))}
      </div>

      <div className="mt-6">
        <label className="mr-6">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Online Payment
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-8 px-8 py-3 bg-plum text-white bg-black rounded-full"
      >
        Place Order
      </button>
    </div>
  );
}
