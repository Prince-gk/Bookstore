import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Bookstore
        </Link>
        <div className="navbar-nav ms-auto">
          <Link to="/cart" className="nav-link position-relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="badge bg-danger rounded-pill cart-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;