import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

let port = process.env.PORT || 4000;
const __dirname = path.resolve();

let app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api', authRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${port}`);
});