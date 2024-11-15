import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBook() {
  // Local state to store form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();  // For navigating to other pages after adding the book

  const handleSubmit = async (e) => {
    e.preventDefault();   // Prevent the form from refreshing the page

    // Construct the new book object
    const newBook = { title, author, price, category, cover, description };

    try {
      // Make a POST request to add the new book to the server
      await axios.post('http://localhost:3001/books', newBook);
      navigate('/');  // After successful submission, navigate back to the home page (BookList)
    } catch (error) {
      console.error('Error adding book:', error);   // Handle any errors
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <Form onSubmit={handleSubmit}>
        {/* Title Input */}
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Author Input */}
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        {/* Price Input */}
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        {/* Category Input */}
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        {/* Cover Image URL Input */}
        <Form.Group controlId="cover">
          <Form.Label>Cover Image URL</Form.Label>
          <Form.Control
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            required
          />
        </Form.Group>

        {/* Description Input */}
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Add Book
        </Button>
      </Form>
    </div>
  );
}

export default AddBook;
