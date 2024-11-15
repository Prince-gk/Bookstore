import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateBook() {
  const [book, setBook] = useState(null);   // State to hold fetched book data
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();   // Get the book ID from the URL
  const navigate = useNavigate();  // For navigating after update

  // Fetch book details when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setCover(response.data.cover);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching book details:', error);   // Handle error if API request fails
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();   // Prevent page refresh on form submission

    const updatedBook = { title, author, price: parseFloat(price), category, cover, description };

    try {
      // Update the book with PUT request
      await axios.put(`http://localhost:3001/books/${id}`, updatedBook);
      navigate(`/book/${id}`);   // Redirect to the book details page after update
    } catch (error) {
      console.error('Error updating book:', error);   // Handle error if PUT request fails
    }
  };

  if (!book) return <div>Loading...</div>;  // Show a loading message while the book data is being fetched

  return (
    <div>
      <h2>Update Book</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form fields similar to AddBook */}
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCover">
          <Form.Label>Cover Image URL</Form.Label>
          <Form.Control
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Book
        </Button>
      </Form>
    </div>
  );
}

export default UpdateBook;
