"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react'; 
import { Resto } from '../../types/resto'; 
import { getRestos, createResto, updateResto, deleteResto } from '../../lib/restos-api'; 
import RestoCard from '../../components/restoCard';

export default function Restos() {


    const router = useRouter();

    const [restos, setRestos] = React.useState<Resto[]>([]);
    const [selectedResto, setSelectedResto] = React.useState<Resto | null>(null);

    const [addRestoMode, setAddRestoMode] = React.useState(false);
    const [editRestoMode, setEditRestoMode] = React.useState(false);

    const [restoName, setRestoName] = useState('');
    const [restoLocation, setRestoLocation] = useState('');
    const [restoRating, setRestoRating] = useState(0);
    const [restoCuisine, setRestoCuisine] = useState('');
    const [restoDescription, setRestoDescription] = useState('');

    useEffect(() => {
        const fetchRestos = async () => {
            try {
                const restosData = await getRestos();
                setRestos(restosData);
            }
            catch (error) {
                console.error('Error fetching restos:', error);
            }
        }
        fetchRestos();
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

    const addRestoClick = async (e: React.FormEvent) => {
        e.preventDefault();

        await createResto(restoName, restoLocation, restoRating, restoCuisine, restoDescription);

        setAddRestoMode(false);
        setRestoName('');
        setRestoLocation('');
        setRestoRating(0);
        setRestoCuisine('');
        setRestoDescription('');

        const restosData = await getRestos();
        setRestos(restosData);
    };

    const editRestoClick = async (resto: Resto) => {
        setEditRestoMode(true);
        setSelectedResto(resto);

        setRestoName(resto.name);
        setRestoLocation(resto.location);
        setRestoRating(resto.rating);
        setRestoCuisine(resto.cuisine);
        setRestoDescription(resto.description);
    };

    const deleteRestoClick = async (id: number) => {
        await deleteResto(id);
        setSelectedResto(null);

        const restosData = await getRestos();
        setRestos(restosData);
    }

    const onExit = async () => {
        setAddRestoMode(false);
        setEditRestoMode(false);
        setSelectedResto(null);

        setAddRestoMode(false);
        setRestoName('');
        setRestoLocation('');
        setRestoRating(0);
        setRestoCuisine('');
        setRestoDescription('');

        const restosData = await getRestos();
        setRestos(restosData);
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
                    {restos.map((resto) => (
                        <RestoCard
                            key={resto.id}
                            resto={resto}
                            onClick={() => {
                                setSelectedResto(resto);
                                setAddRestoMode(false);
                                setEditRestoMode(false);
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => {
                        setAddRestoMode(true);
                        setSelectedResto(null);
                    }
                    }
                    className="ml-10 bg-zinc-500 hover:bg-zinc-300 text-amber-50 border-solid border-1 border-zinc-400 px-5 py-2 rounded-full font-extrabold mt-5"
                >
                   +
                </button>

                {selectedResto && ( 
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                            <button
                                onClick={() => onExit()}
                                className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 font-bold"
                            >
                                X
                            </button>
                            <h2 className="text-2xl text-zinc-600 font-semibold mb-4">{selectedResto.name}</h2>
                            <p className="text-zinc-500 mb-2">Location: {selectedResto.location}</p>
                            <p className="text-zinc-500 mb-2">Cuisine: {selectedResto.cuisine}</p>
                            <p className="text-zinc-500 mb-2">Rating: {selectedResto.rating}</p>
                            <p className="text-zinc-400 mb-4">{selectedResto.description}</p>
                            <div className="flex flex-row justify-between items-center gap-5 absolute bottom-2 right-2 mt-10">
                                <button
                                    onClick={() => editRestoClick(selectedResto)}
                                    className="mb-2 bg-zinc-400 hover:bg-zinc-500 text-amber-50 px-3 py-2 rounded-md font-bold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteRestoClick(selectedResto.id)}
                                    className="mb-2 bg-red-400 hover:bg-red-600 text-amber-50 px-3 py-2 rounded-md font-bold"
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {addRestoMode && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                            <button
                                onClick={() => onExit()}
                                className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 font-bold"
                                >
                                X
                            </button>
                            <h2 className="text-2xl font-semibold text-zinc-500 mt-4 mb-4">Add New Resto</h2>
                            <form onSubmit={addRestoClick} className="flex flex-col gap-4 text-zinc-500">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={restoName}
                                    onChange={(e) => setRestoName(e.target.value)}
                                    required
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={restoLocation}
                                    onChange={(e) => setRestoLocation(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.25"
                                    placeholder="Rating"
                                    value={restoRating}
                                    onChange={(e) => setRestoRating(Number(e.target.value))}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Cuisine"
                                    value={restoCuisine}
                                    onChange={(e) => setRestoCuisine(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                    />
                                <textarea
                                    placeholder="Description"
                                    value={restoDescription}
                                    onChange={(e) => setRestoDescription(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                    />
                                <button
                                    type="submit"
                                    className="bg-zinc-500 hover:bg-zinc-400 text-white px-4 py-2 rounded-full font-bold"
                                >
                                    Add Resto
                                </button>
                                </form>
                        </div>
                    </div>
                )}

                {editRestoMode && selectedResto && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                            <button
                                onClick={() => onExit()}
                                className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 font-bold"
                            >
                                X
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Edit Resto</h2>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (selectedResto) {
                                        await updateResto(
                                            selectedResto.id,
                                            restoName,
                                            restoLocation,
                                            restoRating,
                                            restoCuisine,
                                            restoDescription
                                        );
                                        setEditRestoMode(false);
                                        setSelectedResto(null);
                                        setRestoName('');
                                        setRestoLocation('');
                                        setRestoRating(0);
                                        setRestoCuisine('');
                                        setRestoDescription('');

                                        const restosData = await getRestos();
                                        setRestos(restosData);
                                    }
                                }
                                }
                                className="flex flex-col gap-4 text-zinc-500" >
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={restoName}
                                    onChange={(e) => setRestoName(e.target.value)}
                                    required
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={restoLocation}
                                    onChange={(e) => setRestoLocation(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.25"
                                    placeholder="Rating"
                                    value={restoRating}
                                    onChange={(e) => setRestoRating(Number(e.target.value))}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Cuisine"
                                    value={restoCuisine}
                                    onChange={(e) => setRestoCuisine(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={restoDescription}
                                    onChange={(e) => setRestoDescription(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                    />
                                <button
                                    type="submit"
                                    className="bg-zinc-500 hover:bg-zinc-400 text-white px-4 py-2 rounded-full font-bold"
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