import type { Note } from '../../types';

interface SingleNoteProps {
	note: Note;
	toggleImportance: (id: string) => void;
}

const SingleNote = ({ note, toggleImportance }: SingleNoteProps) => {
	return (
		<>
			<li key={note.id}>{note.content}</li>
			<button
				onClick={() => {
					if (note.id) {
						toggleImportance(note.id);
					}
				}}
			>
				{note.important ? 'make not important' : 'make important'}
			</button>
		</>
	);
};

export default SingleNote;
