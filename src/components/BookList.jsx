import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      setBooks(books.filter((book) => book.id !== id)); // Update the state after deleting
    } catch (error) {
      setError('Error deleting book. Please try again.');
    }
  };

  const handleCreate = () => {
    navigate('/create-book'); // Navigate to the create book page
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center">
        <Alert variant="info">No books available at the moment.</Alert>
      </div>
    );
  }

  return (
    <div>
      <Button variant="success" onClick={handleCreate} className="mb-3">
        Create New Book
      </Button>

      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="book-card h-100">
              <Card.Img variant="top" src={book.cover} alt={book.title} className="book-cover" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text className="text-muted">{book.author}</Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{book.category}</span>
                    <span className="text-success fw-bold">
                      {isNaN(book.price) ? '$0.00' : `$${parseFloat(book.price).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    <Link to={`/book/${book.id}`} className="btn btn-outline-primary flex-grow-1">
                      Details
                    </Link>
                    <Button
                      variant="warning"
                      onClick={() => navigate(`/edit-book/${book.id}`)} // Navigate to the edit book page
                      className="flex-grow-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(book.id)}
                      className="flex-grow-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BookList;
