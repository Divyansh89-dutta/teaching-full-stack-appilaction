import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Shopify Clone
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="hover:text-blue-500">
            Cart
          </Link>
          <Link to="/wishlist" className="hover:underline">Wishlist</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-500">
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-500">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
