import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditBook() {
    const { id } = useParams(); // Get the book ID from the URL
    const navigate = useNavigate(); // For navigation after editing

    const [book, setBook] = useState({
        title: '',
        author: '',
        price: '',
        category: '',
        cover: '',
        description: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/books/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching book details.');
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.put(`http://localhost:3001/books/${id}`, book);
            setSuccess(true);
            navigate('/'); // Redirect to the book list after successful update
        } catch (err) {
            setError('Error updating the book. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading book details...</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h2>Edit Book</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Book updated successfully!</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="author" className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={book.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="cover" className="mb-3">
                    <Form.Label>Cover Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="cover"
                        value={book.cover}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Book'}
                </Button>
            </Form>
        </div>
    );
}

export default EditBook;
