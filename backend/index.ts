import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { notes, noteRouter } from './routes/note.routes.ts';

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());

app.use('/api/notes', noteRouter);

app.get('/api/notes', (req: Request, res: Response) => {
	res.json(notes);
});

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
