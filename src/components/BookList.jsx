import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://bookstore-48wg.onrender.com/books');
        setBooks(response.data);
      } catch (err) {
        setError('Error fetching books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleShowModal = (book) => {
    setSelectedBook(book); // Store the book to be deleted
    setShowModal(true);    // Show the modal
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://bookstore-48wg.onrender.com/books/${selectedBook.id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id));
      setShowModal(false); // Close the modal after deletion
    } catch (err) {
      setError('Error deleting book. Please try again.');
      setShowModal(false); // Close the modal
    }
  };

  const handleCreate = () => {
    navigate('/add-book'); // Navigate to the create book page
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
      <div className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center my-5">
        <Alert variant="info">No books available at the moment.</Alert>
        <Button variant="success" onClick={handleCreate} className="mt-3">
          Create New Book
        </Button>
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
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={book.cover || 'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg'}
                alt={book.title || 'Book Cover'}
                className="book-cover"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title || 'Untitled'}</Card.Title>
                <Card.Text className="text-muted">{book.author || 'Unknown Author'}</Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{book.category || 'Uncategorized'}</span>
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
                      onClick={() => navigate(`/edit-book/${book.id}`)}
                      className="flex-grow-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(book)}
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

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook ? (
            <>
              Are you sure you want to delete the book: <b>{selectedBook.title}</b>?
              <br />
              This action cannot be undone.
            </>
          ) : (
            'Are you sure you want to delete this book?'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookList;
