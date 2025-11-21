"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; 
import { Note } from '../../types/note';
import { getNotes, createNote, deleteNote, updateNote } from '../../lib/notes-api';
import NoteCard from '../../components/noteCard';
export default function Notes() {

    const router = useRouter();

    const [notes, setNotes] = React.useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const [addNoteMode, setAddNoteMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getNotes();
                setNotes(data);
            }
            catch (error) {
                console.error('Error fetching notes:', error);
            }
        }
        fetchNotes();
    }
        , []);


    const notesPageClick = () => {
        router.push('/notes');
    }

    const restosPageClick = () => {
        router.push('/restos');
    }

    const datesPageClick = () => {
        router.push('/dates');
    }

    const addNoteClick = async (e: React.FormEvent) => {
        e.preventDefault();

        await createNote(formTitle, formDescription);

        setAddNoteMode(false);
        setFormTitle('');
        setFormDescription('');

        const data = await getNotes();
        setNotes(data);
    };

    const editNoteClick = async (note: Note) => {
        setEditMode(true);
        setSelectedNote(note);

        setFormTitle(note.title);
        setFormDescription(note.description);
        setSelectedNote(note);
    };

    const deleteNoteClick = async (id: number) => {
        await deleteNote(id);
        setSelectedNote(null);

        const data = await getNotes();
        setNotes(data);
    };

    const onExit = async () => {
        setAddNoteMode(false);
        setEditMode(false);
        setSelectedNote(null);
        setFormTitle('');
        setFormDescription('');

        const data = await getNotes();
        setNotes(data);
    }

    return (
        <div className="flex min-h-screen font-mono-roboto font-bold bg-amber-50">
            <main className="flex w-full flex-col items-center justify-center py-10 px-10 gap-5">
                <div className="flex w-full flex-row items-center justify-center gap-10">
                    <button
                        onClick={notesPageClick}
                        className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-2 rounded-full font-bold">
                        NOTES
                    </button>

                    <button
                        onClick={restosPageClick}
                        className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-2 rounded-full font-bold">
                        RESTOS
                    </button>


                    <button
                        onClick={datesPageClick}
                        className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-2 rounded-full font-bold">
                        DATES
                    </button>

                </div>
                <div className="p-8 grid grid-cols-3 sm:grid-cols-2 md:grids-cols-3 gap-5">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onClick={() => setSelectedNote(note)}
                        />
                    ))}

                    {selectedNote && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                                <button
                                    onClick={() => onExit()}
                                    className="absolute top-2 right-5 text-zinc-500 hover:text-zinc-600 text-1xl font-extrabold"
                                >
                                    X
                                </button>
                                <h2 className="text-2xl text-zinc-600 font-semibold mt-4 mb-4">{selectedNote.title}</h2>
                                <p className="text-zinc-500 mb-4">{selectedNote.description}</p>
                                <small className="text-zinc-400">Created at: {new Date(selectedNote.createdAt).toLocaleDateString()}</small>
                                <br></br>
                                <br></br>
                                <div className="flex flex-row justify-between items-center gap-5 absolute bottom-2 right-2 mt-10">
                                    <button
                                        onClick={() => editNoteClick(selectedNote)}
                                        className="mb-2 bg-zinc-400 hover:bg-zinc-500 text-amber-50 px-3 py-2 rounded-md font-bold"
                                    >
                                        Edit
                                    </button>

                                <button
                                    onClick={() => deleteNoteClick(selectedNote.id)}
                                    className="mb-2 bg-red-400 hover:bg-red-600 text-amber-50 px-3 py-2 rounded-md font-bold"
                                >
                                    Delete
                                </button>
                                </div>

                                
                            </div>
                        </div>
                    )}
                </div>


                <button
                    onClick={() => setAddNoteMode(true)}
                    className="ml-10 bg-zinc-500 hover:bg-zinc-300 text-amber-50 border-solid border-1 border-zinc-400 px-5 py-2 rounded-full font-extrabold mt-5"
                >
                    +
                </button>

                {addNoteMode && ( 
                    <div className="fixed inset-0 bg-zinc-100 bg-opacity-5 flex items-center justify-center">
                        <div className="bg-amber-50 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                            <button
                                onClick={() => onExit()}
                                className="absolute top-2 right-5 text-zinc-500 hover:text-zinc-600 text-1xl font-extrabold"
                            >
                                X
                            </button>
                            <h2 className="text-2xl font-semibold text-zinc-500 mt-4 mb-4">Add New Note</h2>

                            <form onSubmit={addNoteClick} className="flex flex-col gap-4 ">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="border border-zinc-300 text-zinc-500 rounded-md p-2 w-full"
                                    required
                                />
                                <br />

                                <textarea
                                    placeholder="Description"
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    className="border border-zinc-300 text-zinc-500 rounded-md p-2 w-full h-32"
                                    required
                                />
                                <br />
                                <button
                                    type="submit"
                                    className="bg-zinc-500 hover:bg-zinc-400 text-amber-50 px-4 py-2 rounded-md font-bold"
                                >
                                    Add Note
                                </button>
                            </form>
                        </div>
                    </div>
                )
                }

                {editMode && selectedNote && (
                    <div className="fixed inset-0 bg-zinc-100 bg-opacity-5 flex items-center justify-center">
                        <div className="bg-amber-50 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                            <button
                                onClick={() => onExit()}
                                className="absolute top-2 right-5 text-zinc-500 hover:text-zinc-600 text-1xl font-extrabold"
                            >
                                X
                            </button>
                            <h2 className="text-2xl font-semibold text-zinc-500 mt-4 mb-4">Edit Note</h2>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                if (selectedNote) {
                                    await updateNote(selectedNote.id, formTitle, formDescription);
                                    setEditMode(false);
                                    setSelectedNote(null);
                                    setFormTitle('');
                                    setFormDescription('');
                                    const data = await getNotes();
                                    setNotes(data);
                                }
                            }
                                } className="flex flex-col gap-4 ">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="border border-zinc-300 text-zinc-500 rounded-md p-2 w-full"
                                    required
                                />
                                <br />
                                <textarea
                                    placeholder="Description"
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    className="border border-zinc-300 text-zinc-500 rounded-md p-2 w-full h-32"
                                    required
                                    />
                                <br />
                                <button
                                    type="submit"
                                    className="bg-zinc-500 hover:bg-zinc-400 text-amber-50 px-4 py-2 rounded-md font-bold"
                                    >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}