"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; 
import { Note } from '../../types/note';
import { getNotes } from '../../lib/notes-api';
import NoteCard from '../../components/noteCard';
export default function Notes() {

    const router = useRouter();
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [addNoteMode, setAddNoteMode] = useState(false);

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
                        <div className="fixed inset-0 bg-zinc-100 bg-opacity-5 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                                <button
                                    onClick={() => setSelectedNote(null)}
                                    className="absolute top-2 right-5 text-zinc-500 hover:text-zince-600 text-1xl font-extrabold"
                                >
                                    X
                                </button>
                                <h2 className="text-2xl font-semibold mt-4 mb-4">{selectedNote.title}</h2>
                                <p className="text-zinc-600 mb-4">{selectedNote.description}</p>
                                <small className="text-zinc-400">Created at: {new Date(selectedNote.createdAt).toLocaleDateString()}</small>

                                
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
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                            <button
                                onClick={() => setAddNoteMode(false)}
                                className="absolute top-2 right-5 text-zinc-500 hover:text-zince-600 text-1xl font-extrabold"
                            >
                                X
                            </button>
                            <h2 className="text-2xl font-semibold mt-4 mb-4">Add New Note</h2>
                            {/* Form fields for adding a new note would go here */}
                        </div>
                    </div>
                )
                }

            </main>
        </div>
    );
}