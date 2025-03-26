import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    
  return (
    <div className="container text-center " >
      <h2>Welcome to Book Management</h2>
      
      <div className="mt-5 w-100">
       
        <Link to="/addBook">
          <button className="btn  bg-success text-white">
            Add Book
          </button>
        </Link>
    
        <Link to="/getByTitle" className="ms-3">
          <button className="btn  bg-success text-white">
            Find Book
          </button>
        </Link>

        <Link to="/borrowedBook" className="ms-3">
          <button className="btn bg-success text-white">
            Borrowed Book
          </button>
        </Link>

        <Link to="/get" className="ms-3 mt-4">
          <button className="btn  bg-success text-white">
           All Books 
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Home;
