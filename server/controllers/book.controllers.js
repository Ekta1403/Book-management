import db from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const addBook = (req, res) => {
    const q = "SELECT * FROM books WHERE title = ? ";
    db.query(q, [req.body.title], (err, data) => {
        if (err)
            return res.status(500).json(err);
        if (data.length > 0) {
            return res.status(400).json({ message: 'Book with this title already exists' });
        }
        const query = 'INSERT INTO books (`title`, `author`, `description`,`book_type`,`pages`,`published_date` ) VALUES (?)';

        const values = [
            req.body.title,
            req.body.author,
            req.body.description,
            req.body.book_type,
            req.body.pages,
            req.body.published_date
        ]
        db.query(query, [values], (err, data) => {
            if (err) {

                return res.status(500).json({
                    message: 'Error adding book',
                    error: err.message
                });
            }
            return res.status(201).json({
                message: 'Book added successfully',
                data
            });
        });
    })
};


export const getBooks = (req, res) => {
    const query = 'SELECT * FROM books';

    db.query(query, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: 'Error retrieving books',
                error: err.message
            });
        }
        return res.status(200).json({
            message: 'Books retrieved successfully',
            data: data
        });
    });
};


export const getBookById = (req, res) => {
    const q = "SELECT * FROM books Where id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}


export const getBookByTitle = (req, res) => {
    const { title } = req.query;
    const q = "SELECT * FROM books where title =?";
    db.query(q, [title], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })
}


export const updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    const query = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
    db.query(query, [title, author, id], (err, data) => {
        if (err) {
            return res.status(500).json({
                message: 'Error updating book',
                error: err.message
            });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        return res.status(200).json({
            message: 'Book updated successfully',
            data: {
                id,
                title,
                author
            }
        });
    });
};


export const getUserBooks = (req, res) => {
    const userId = req.params.userId;

    const query = `
    SELECT user.F_name, user.L_name, books.title, books.author, user_books.status, user_books.borrowed_date
    FROM user
    JOIN user_books ON user.id = user_books.user_id
    JOIN books ON books.id = user_books.book_id
    WHERE user.id = ?;
`;
    db.query(query, [userId], (err, data) => {
        if (err) {
            return res.status(500).json(new ApiError(500, "Internal Server Error"))
        }

        if (data.length === 0) {
            return res.status(404).json(new ApiError(404, "No books found for this user"));
        }

        return res.status(200).json(new ApiResponse(200, data, "Books retrieved successfully"));
    });
};


export const DeleteBook = (req, res) => {
    const q = "select * FROM books WHERE id =?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        const q = "DELETE FROM books WHERE id =? ";
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json({
                message: `Book deleted successfully...!`,
                data
            })
        })
    })
}

