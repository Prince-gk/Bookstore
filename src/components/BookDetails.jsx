import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false); // State to track adding process
  const [added, setAdded] = useState(false); // State to track if the book was added
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Check if the book is already in the cart
  const isBookInCart = cart.some(item => item.id === book?.id);

  const handleAddToCart = () => {
    setAddingToCart(true);
    setAdded(false);

    if (isBookInCart) {
      // If the book is already in the cart, just update quantity
      const existingBook = cart.find(item => item.id === book.id);
      addToCart({ ...existingBook, quantity: existingBook.quantity + 1 });
    } else {
      // Otherwise, add the book to the cart
      addToCart({ ...book, quantity: 1 });
    }

    setAddingToCart(false);
    setAdded(true);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center my-5">
        {error}
      </Alert>
    );
  }

  if (!book) {
    return (
      <div className="text-center my-5">
        <Alert variant="warning">Book not found</Alert>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm my-4">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={book.cover || 'https://via.placeholder.com/150'}
            alt={book.title || 'Book Cover'}
            className="img-fluid h-100 object-fit-cover"
          />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title className="h2">{book.title || 'Untitled'}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author || 'Unknown Author'}
                </Card.Subtitle>
              </div>
              <span className="h3 text-success">
                ${book.price || '0.00'}
              </span>
            </div>
            <span className="badge bg-secondary">
              {book.category || 'Uncategorized'}
            </span>
            <Card.Text className="mt-3">
              {book.description || 'No description available.'}
            </Card.Text>

            {/* Add to Cart Button with Feedback */}
            <div className="d-flex gap-2 mt-4">
              <Link to="/" className="btn btn-outline-primary">
                Back to Books
              </Link>
              <Button
                variant="primary"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : added ? (
                  'Added to Cart'
                ) : (
                  'Add to Cart'
                )}
              </Button>
            </div>

            {/* Display success message after adding to cart */}
            {added && !addingToCart && (
              <Alert variant="success" className="mt-3">
                Book added to cart!
              </Alert>
            )}
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default BookDetails;
