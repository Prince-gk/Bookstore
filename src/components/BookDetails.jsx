import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
console.log("bookdetails rendered");
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center">Book not found</div>;
  }

  return (
    <Card className="border-0 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={book.cover}
            alt={book.title}
            className="img-fluid h-100 object-fit-cover"
          />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title className="h2">{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author}
                </Card.Subtitle>
              </div>
              <span className="h3 text-success">${book.price.toFixed(2)}</span>
            </div>
            <span className="badge bg-secondary">{book.category}</span>
            <Card.Text className="mt-3">{book.description}</Card.Text>
            <div className="d-flex gap-2 mt-4">
              <Link to="/" className="btn btn-outline-primary">
                Back to Books
              </Link>
              <Button variant="primary" onClick={() => addToCart(book)}>
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}
export default BookDetails;