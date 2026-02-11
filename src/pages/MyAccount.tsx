import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/Signup");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    // Fetch user data
    fetch("/api/user", { headers })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(setUser)
      .catch(err => {
        console.error(err);
        setError("Failed to load profile");
      });

    // Fetch orders
    fetch("/api/orders", { headers })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then(setOrders)
      .catch(err => {
        console.error(err);
        setError("Failed to load orders");
      });

    // Fetch addresses
    fetch("/api/addresses", { headers })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch addresses");
        return res.json();
      })
      .then(setAddresses)
      .catch(err => {
        console.error(err);
        setError("Failed to load addresses");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/Signup");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">👤 My Account</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Profile Info */}
      <section className="mb-6 border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        {user ? (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || "Not Provided"}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </section>

      {/* Orders */}
      <section className="mb-6 border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Purchase Orders</h2>
        {orders.length > 0 ? (
          <ul className="space-y-2">
            {orders.map(order => (
              <li key={order.id} className="border p-2 rounded">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <button
                  onClick={() => window.open(`/invoice/${order.id}`, "_blank")}
                  className="text-blue-600 underline mt-1"
                >
                  View Invoice
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </section>

      {/* Addresses */}
      <section className="mb-6 border rounded-lg p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Saved Addresses</h2>
        {addresses.length > 0 ? (
          <ul className="space-y-2">
            {addresses.map((address, idx) => (
              <li key={idx} className="border p-2 rounded">
                <p>{address.line1}, {address.city}, {address.state} - {address.zip}</p>
                <p><strong>Phone:</strong> {address.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved addresses.</p>
        )}
        <button className="mt-2 text-blue-600 underline">+ Add Address</button>
      </section>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default MyAccount;
