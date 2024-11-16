/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateBook() {
  const [book, setBook] = useState(null); // Book data from the server
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = useParams(); // Book ID from the route
  const navigate = useNavigate(); // Navigation instance

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://bookstore-48wg.onrender.com/books/${id}`);
        const data = response.data;
        setBook(data);
        setTitle(data.title || '');
        setAuthor(data.author || '');
        setPrice(data.price || '');
        setCategory(data.category || '');
        setCover(data.cover || '');
        setDescription(data.description || '');
      } catch (err) {
        setError('Failed to fetch book details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !price || !category || !cover || !description) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    const updatedBook = {
      title,
      author,
      price: parseFloat(price),
      category,
      cover,
      description,
    };

    try {
      await axios.put(`https://bookstore-48wg.onrender.com/books/${id}`, updatedBook);
      navigate(`/book/${id}`); // Redirect to book details page after success
    } catch (err) {
      setError('Failed to update book. Please try again later.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <h2>Update Book</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAuthor" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCover" className="mt-3">
          <Form.Label>Cover Image URL</Form.Label>
          <Form.Control
            type="url"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
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
