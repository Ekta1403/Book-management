import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import cors from "cors"
import userRouter from "./routes/book.routes.js"


dotenv.config();
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true
    })
)


app.use("/api/auth", userRouter)


const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
