import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
console.log("cart rendered");
  if (cart.length === 0) {
    return (
      <div className="text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Shopping Cart</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Book</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.cover}
                    alt={item.title}
                    style={{ width: '50px', marginRight: '1rem' }}
                  />
                  <div>
                    <h6 className="mb-0">{item.title}</h6>
                    <small className="text-muted">{item.author}</small>
                  </div>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="d-flex align-items-center" style={{ width: '120px' }}>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">
              Total:
            </td>
            <td className="fw-bold">${cartTotal.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
        <Button variant="success">Proceed to Checkout</Button>
      </div>
    </div>
  );
}


export default Cart;