import { Note } from '../types/note';

interface NoteCardProps {
    note: Note;
    onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="w-full max-w-md p-5 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow font-mono-roboto border-solid border-1 border-zinc-300 "
        >
            <h2 className="text-xl font-semibold text-zinc-500 mb-4">{note.title}</h2>
            <p className="text-zinc-400">{note.description}</p>
        </div>
    );
};

export default NoteCard;
