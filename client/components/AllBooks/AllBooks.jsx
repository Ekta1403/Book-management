import React, { useState, useEffect } from "react";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:4545/api/auth/get");

        console.log("API Response:", response.data.data);

        if (response.data.data.length === 0) {
          setError("No books found.");
        } else {
          setBooks(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(
          "An error occurred while fetching the books. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container text-center">
      <div className="">
        <div className="text-center">
          <h2 className="">All Books</h2>
        </div>

        {loading && <div>Loading...</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="book-table mt-3 ">
          <table className="table table-bordered mt-3 ">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Book Type</th>
                <th>Pages</th>
                <th>Published Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.book_type}</td>
                  <td>{book.pages}</td>
                  <td>{book.published_date}</td>
                  <td className="w-25 text-center">
                    <button className="m-2 bg-info">update</button>
                    <button className="m-2 bg-danger ">Delete</button>
                    {/* <button >
                    <img src="https://cdn-icons-png.flaticon.com/128/5973/5973595.png" alt="" className="" style={{width:"30px"}}/>
                    </button>
                    <img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png" alt="" className=" ms-4" style={{width:"30px"}}/> */}
                   
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
