// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import AddBook from "../components/AddBook/AddBook";
// import BookSearch from "../components/SearchBook/BookSearch";
// import Home from "../components/Home/Home";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<Home />} />
//         <Route path="/addBook" element={<AddBook />} />
//         <Route path="/getByTitle" element={<BookSearch />} />

//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";

import AddBook from "../components/AddBook/AddBook";
import BookSearch from "../components/SearchBook/BookSearch";
import Home from "../components/Home/Home";
import BorrowedBook from "../components/BorrowedBooks/BorrowedBook";
import Register from "../components/Register/Register";
import AllBooks from "../components/AllBooks/AllBooks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addBook" element={<AddBook />} />
      <Route path="/getByTitle" element={<BookSearch />} />
      <Route path="/borrowedBook" element={<BorrowedBook />} />
      <Route path="/get" element={<AllBooks />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;
