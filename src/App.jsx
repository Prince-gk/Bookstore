import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import BookForm from './components/AddBook';
import EditBook from './components/DeleteBook';



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
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;