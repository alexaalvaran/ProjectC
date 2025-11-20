import dotenv from 'dotenv';
import path from 'path';

//dotenv.config({ path: path.resolve(__dirname, '../.env') });
//dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

import express from "express";
import cors from "cors";
import notesRoutes from "./api/notes/notes.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/ping', (req, res) => {
    res.send('pong');
});
