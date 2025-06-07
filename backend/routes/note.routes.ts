import { Router } from 'express';
import type { Request, Response } from 'express';
type Note = {
	id: string;
	content: string;
	important: boolean;
};

export let notes: Note[] = [
	{
		id: '1',
		content: 'HTML is easy',
		important: true,
	},
	{
		id: '2',
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: '3',
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
];

export const noteRouter = Router();

noteRouter.get('/', (req: Request, res: Response) => {
	res.send(notes);
});

noteRouter.post('/', (req: Request, res: Response) => {
	if (!req.body.content) {
		return res.status(400).json({
			error: 'content missing',
		});
	}
	const note = {
		id: String(notes.length + 1),
		...req.body,
	};
	notes = notes.concat(note);
	res.json(note);
});

noteRouter.get('/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	const note = notes.find((note) => note.id === id);

	if (note) {
		res.send(note);
	} else {
		res.status(404).end();
	}
});

noteRouter.delete('/:id', (req: Request, res: Response) => {
	const id = req.params.id;
	notes = notes.filter((note) => note.id !== id);

	res.status(204).end();
});
