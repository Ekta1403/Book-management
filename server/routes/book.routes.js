import express from "express"
import { addBook, getBookById, getBookByTitle, getBooks, getUserBooks, updateBook } from "../controllers/book.controllers.js"
import { getUser, login, register } from "../controllers/user.controllers.js"

const router = express.Router()


// user routes

router.post('/register', register)
router.post('/login', login)
router.get('/getUser', getUser)


// book routes
router.post('/add', addBook)
router.get('/get', getBooks)
router.get("/get/:id", getBookById);
router.get("/getByTitle", getBookByTitle);
router.put("/update/:id", updateBook);
router.get('/:userId/books', getUserBooks);
router.delete()


export default router;