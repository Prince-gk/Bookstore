import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AddBook from './components/AddBook';
import DeleteBook from './components/DeleteBook';
import EditBook from './components/EditBook';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-vh-100 bg-light d-flex flex-column">
          <Navbar />

          <main className="container py-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/cart" element={<Cart />} />
              {/* Add Book Route */}
              <Route path="/add-book" element={<AddBook />} />
              {/* Edit Book Route */}
              <Route path="/edit-book/:id" element={<EditBook />} />
              {/* Delete Book Route */}
              <Route path="/delete-book/:id" element={<DeleteBook />} />
              {/* Fallback Route */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
