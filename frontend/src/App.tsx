import type { Note } from '../types';
import SingleNote from './components/SingleNote';
import noteService from './services';
import Notification from './components/Notification';

import { type FormEvent, useState, useRef, useEffect } from 'react';

const App = () => {
	const [notesList, setNotesList] = useState<Note[]>([]);
	const [showAll, setShowAll] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const toggleImportanceOf = (id: string) => {
		const note = notesList.find((n) => n.id === id);

		if (!note) {
			setError('Note not found');
			setTimeout(() => setError(null), 5000);
			return;
		}

		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotesList(
					notesList.map((note) => (note.id !== id ? note : returnedNote))
				);
			})
			.catch((error) => {
				setError(`Note '${note.content}' was already removed from server`);
				console.error(error);
				setTimeout(() => {
					setError(null);
				}, 5000);
				setNotesList(notesList.filter((n) => n.id !== id));
			});
	};

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const initialNotes = await noteService.getAll();
				setNotesList(initialNotes);
			} catch (error) {
				setError('Failed to fetch notes from server');
				console.error(error);
				setTimeout(() => setError(null), 5000);
			}
		};
		fetchNotes();
	}, []);

	const notesToShow = showAll
		? notesList
		: notesList.filter((note) => note.important);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputRef.current?.value.trim()) {
			setError('Note content cannot be empty');
			setTimeout(() => setError(null), 5000);
			return;
		}

		try {
			const newObject = {
				content: inputRef.current.value,
				important: Math.random() < 0.5,
			};

			const createNote = await noteService.create(newObject);
			setNotesList([...notesList, createNote]);

			if (inputRef.current) {
				inputRef.current.value = '';
			}
		} catch (error) {
			console.error(error);
			setError('Failed to create new note');
			setTimeout(() => setError(null), 5000);
		}
	};

	return (
		<div>
			<h1>Notes</h1>
			{error && <Notification error={error} />}
			<ul>
				{notesToShow.map((note) => (
					<SingleNote
						toggleImportance={toggleImportanceOf}
						key={note.id}
						note={note}
					/>
				))}
			</ul>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<form onSubmit={handleFormSubmit}>
				<input ref={inputRef} type='text' name='addQuote' />
				<button type='submit'>Save</button>
			</form>
		</div>
	);
};

export default App;
