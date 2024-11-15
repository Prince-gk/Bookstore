import React from "react";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Us Section */}
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Your trusted online bookstore, offering a wide range of books across genres and authors.
            Empowering readers worldwide with easy access to the books they love.
          </p>
        </div>

        

        {/* Contact Info Section */}
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p><i className="fas fa-phone"></i> +123 456 789</p>
          <p><i className="fas fa-envelope"></i> support@bookstore.com</p>
          <p><i className="fas fa-map-marker-alt"></i> 123 Book Street, Literature City</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Bookstore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;