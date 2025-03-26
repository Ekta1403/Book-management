import React, { useState } from 'react';
import { Button, Table, Alert } from 'react-bootstrap';
import "../BorrowedBooks/BorrowedBook.css"; 

const BorrowedBook = () => {
  const [userId, setUserId] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchBooks = async () => {
    if (!userId) {
      setError('Please enter a User ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4545/api/auth/${userId}/books`);
      const data = await response.json();

      if (response.ok) {
        setBooks(data.data);
      } else {
        setError(data.message || 'Error fetching books');
        setBooks([]);
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred while fetching the data');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Borrowed Books</h1>

      {/* Input Section using div instead of Form components */}
      <div className="input-section mb-4">
        <label htmlFor="userId">Enter User ID</label>
        <input
          id="userId"
          type="number"
          className="form-control"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          onClick={handleFetchBooks}
          className="btn btn-primary mt-3 w-100"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Borrowed Books'}
        </button>
      </div>

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Table to display the books using div */}
      {books.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Borrowed Date</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.F_name}</td>
                  <td>{book.L_name}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.status}</td>
                  <td>{book.borrowed_date ? new Date(book.borrowed_date).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowedBook;
