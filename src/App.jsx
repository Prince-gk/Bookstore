import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import Footer from './components/Footer'; // Adjust the path if necessary
import AddBook from './components/AddBook';
import DeleteBook from './components/DeleteBook';
import UpdateBook from './components/UpdateBook';
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-vh-100 bg-light">
          <Navbar />
          
          <main className="container py-4">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/cart" element={<Cart />} />
              {/* Route for AddBook (Create Book) */}
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;