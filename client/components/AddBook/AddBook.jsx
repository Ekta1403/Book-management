import React, { useState } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [bookType, setBookType] = useState("");
  const [pages, setPages] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title,
      author,
      description,
      book_type: bookType,
      pages,
      published_date: publishedDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:4545/api/auth/add",
        bookData
      );
      setMessage(response.data.message);
      setTitle("");
      setAuthor("");
      setDescription("");
      setBookType("");
      setPages("");
      setPublishedDate("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  setTimeout(() => {
    setMessage(""); // Clear the success message after the timeout
  }, 1000);

  
  return (
    <div className="container mt-5 w-25 ">
      <div className="d-flex justify-content-center">
        <h2>Add Books</h2>
      </div>
      <div className="add-book-form">
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Book Type</label>
          <input
            type="text"
            className="form-control"
            value={bookType}
            onChange={(e) => setBookType(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Pages</label>
          <input
            type="number"
            className="form-control"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Published Date</label>
          <input
            type="date"
            className="form-control"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit" onClick={handleSubmit}>
            Add Book
          </Button>
        </div>

        {message && (
          <Alert variant="success" className="mt-3">
            {message}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AddBook;
