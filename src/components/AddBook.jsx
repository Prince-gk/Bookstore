import React, { useState } from 'react';
import { Form, Button, Spinner, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price <= 0) {
      setError('Price must be a positive value.');
      return;
    }

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get('https://bookstore-48wg.onrender.com/books');
      const books = response.data;


      const nextId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;

      const newBook = {
        id: nextId,
        title,
        author,
        price,
        category,
        cover,
        description,
      };

      await axios.post('https://bookstore-48wg.onrender.com/books', newBook);


      setTitle('');
      setAuthor('');
      setPrice('');
      setCategory('');
      setCover('');
      setDescription('');

      navigate('/');
    } catch (err) {
      setError('Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="mb-4 text-center">Add New Book</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Title Input */}
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-describedby="titleHelp"
            />
            <Form.Text id="titleHelp" muted>
              Provide the title of the book.
            </Form.Text>
          </Form.Group>

          {/* Author Input */}
          <Form.Group controlId="author" className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Form.Group>

          {/* Price Input */}
          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter book price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </Form.Group>

          {/* Category Input */}
          <Form.Group controlId="category" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          {/* Cover Image URL Input */}
          <Form.Group controlId="cover" className="mb-3">
            <Form.Label>Cover Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter URL of cover image"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              required
            />
          </Form.Group>

          {/* Description Input */}
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter a brief description of the book"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Adding Book...
                </>
              ) : (
                'Add Book'
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default AddBook;
