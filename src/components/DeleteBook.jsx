import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DeleteBook() {
  const { id } = useParams();   // Get the book ID from the URL
  const navigate = useNavigate();  // For navigating after deletion

  const handleDelete = async () => {
    try {
      // Send DELETE request to remove the book from the backend
      await axios.delete(`http://localhost:3001/books/${id}`);
      navigate('/');  // After deletion, navigate back to the home page (BookList)
    } catch (error) {
      console.error('Error deleting book:', error);   // Handle error if DELETE request fails
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this book?</h2>
      {/* Button to confirm deletion */}
      <Button variant="danger" onClick={handleDelete}>
        Yes, Delete
      </Button>
    </div>
  );
}

export default DeleteBook;