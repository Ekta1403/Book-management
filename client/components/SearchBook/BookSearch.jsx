import React, { useState } from "react";
import axios from "axios";
import "../SearchBook/bookSearch.css";

const BookSearch = () => {
  const [title, setTitle] = useState(""); 
  const [book, setBook] = useState(null); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

 
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      const response = await axios.get("http://localhost:4545/api/auth/getByTitle", {
        params: { title },
      });

      if (response.data.length === 0) {
        setError("No books found with that title.");
      } else {
        setBook(response.data[0]); 
      }
    } catch (err) {
      console.log(err)
      setError("An error occurred while fetching the book. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="search-form">
        <h2>Search for a Book </h2>
        <form onSubmit={handleSearch}>
          <div>
            <label>Book Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search Book"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {book && (
          <div className="book-details">
            <h3>Book Details</h3>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Book Type:</strong> {book.book_type}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>publishedDate:</strong> {book.published_date}</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
