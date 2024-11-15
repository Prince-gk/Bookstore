import React, { useState } from 'react';
import { Button, Alert, Container, Card, Spinner, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DeleteBook() {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate(); // For navigation after deletion
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false); // Cancel confirmation

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send DELETE request to remove the book
      await axios.delete(`http://localhost:3001/books/${id}`);
      navigate('/'); // Navigate back to the home page after successful deletion
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete the book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    navigate('/'); // Navigate back to the home page without deleting
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ maxWidth: '400px' }}>
        <h4 className="text-center mb-4">
          Are you sure you want to delete this book?
        </h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="d-flex justify-content-between">
          {/* Cancel Button */}
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Canceling...
              </>
            ) : (
              'Cancel'
            )}
          </Button>

          {/* Confirm Delete Button */}
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              'Yes, Delete'
            )}
          </Button>
        </div>
      </Card>

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel? No changes will be made to the book.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Go Back
          </Button>
          <Button variant="primary" onClick={confirmCancel}>
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DeleteBook;
