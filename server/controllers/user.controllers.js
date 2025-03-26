import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js"



export const register = async (req, res) => {
    try {
        const { F_name, L_name, email, password, role } = req.body;

        if (!F_name || !L_name || !email || !password) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role ? role : 'user';


        const q = 'INSERT INTO user (F_name, L_name, email, password, role) VALUES (?, ?, ?, ?, ?)';

        db.query(q, [F_name, L_name, email, hashedPassword, userRole], (err, data) => {
            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res
                        .status(400)
                        .json(new ApiError(400, "This email is already registered."));
                }
                return res
                    .status(400)
                    .json(new ApiError(400, "Something went wrong. Please try again."));
            }
            return res
                .status(201)
                .json(new ApiResponse(201, data, "User registered successfully."));
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Email and password are required"));
        }

        const q = 'SELECT * FROM user WHERE email = ?';
        db.query(q, [email], async (err, data) => {
            if (err) {
                return res.status(400).json(new ApiError(400, "Something went wrong"));
            }

            if (data.length === 0) {
                return res.status(400).json(new ApiError(400, "Invalid email or password"));
            }

            const user = data[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json(new ApiError(400, "Invalid email or password"));
            }

            return res.status(200).json(new ApiResponse(200, user, "Login successful"));
        });
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};


export const getUser = (req, res) => {
    const query = "SELECT * FROM user ";

    db.query(query, (err, data) => {
        if (err) {

            return res.status(500).json(new ApiError(500, "Error retrieving users"));
        }
        return res.status(200).json(new ApiResponse(200, data, "User retrieved successfully"));
    })
}

