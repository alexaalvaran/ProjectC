"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { Date } from '../../types/date'; 
import { useEffect, useState } from 'react';
import { getDates, createDate, updateDate, deleteDate } from '../../lib/dates-api';
import DateCard from '../../components/dateCard';

export default function Dates() {

    const router = useRouter();

    const [dates, setDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [addDateMode, setAddDateMode] = useState<boolean>(false);
    const [editDateMode, setEditDateMode] = useState<boolean>(false);

    const [DateName, setDateName] = useState<string>('');
    const [DateLocation, setDateLocation] = useState<string>('');
    const [DateDescription, setDateDescription] = useState<string>('');

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const datesData = await getDates();
                setDates(datesData);
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };
        fetchDates();
    }, []);

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

        await createDate(DateName, DateLocation, DateDescription);

        setAddDateMode(false);
        setDateName('');
        setDateLocation('');
        setDateDescription('');

        const datesData = await getDates();
        setDates(datesData);
    };

    const editRestoClick = async (date: Date) => {
        setEditDateMode(true);
        setSelectedDate(date);

        setDateName(date.name);
        setDateLocation(date.location);
        setDateDescription(date.description);
    };

    const deleteRestoClick = async (id: number) => {
        await deleteDate(id);

        setSelectedDate(null);

        const datesData = await getDates();
        setDates(datesData);
    };

    const onExit = async () => {

        setAddDateMode(false);
        setEditDateMode(false);
        setSelectedDate(null);
        setDateName('');
        setDateLocation('');
        setDateDescription('');
    };

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
                    {dates.map((date) => (
                        <DateCard
                            key={date.id}
                            date={date}
                            onClick={() => { setSelectedDate(date); }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => {
                        setAddDateMode(true);
                        setSelectedDate(null);
                    }}
                    className="ml-10 bg-zinc-500 hover:bg-zinc-300 text-amber-50 border-solid border-1 border-zinc-400 px-5 py-2 rounded-full font-extrabold mt-5"
                >
                    +
                </button>

                {selectedDate && !editDateMode && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                            <button
                                onClick={onExit}
                                className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 font-bold"
                            >
                                X
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-zinc-500">{selectedDate.name}</h2>
                            <p className="text-zinc-400 mb-2">Location: {selectedDate.location}</p>
                            <p className="text-zinc-400 mb-4">{selectedDate.description}</p>
                            <div className="flex flex-row justify-between items-center gap-5 absolute bottom-2 right-2 mt-10">
                                <button
                                    onClick={() => editRestoClick(selectedDate)}
                                    className="mb-2 bg-zinc-400 hover:bg-zinc-500 text-amber-50 px-3 py-2 rounded-md font-bold"
                                    >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteRestoClick(selectedDate.id)}
                                    className="mb-2 bg-red-400 hover:bg-red-600 text-amber-50 px-3 py-2 rounded-md font-bold"
                                >
                                    Delete
                                    </button>
                            </div>
                        </div>
                    </div>
                )}

                {addDateMode && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                            <button
                                onClick={onExit}
                                className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 font-bold"
                                >
                                X
                            </button>
                            <h2 className="text-2xl font-bold mb-4 text-zinc-500">Add New Date</h2>
                            <form onSubmit={addRestoClick} className="flex flex-col gap-4 text-zinc-500">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={DateName}
                                    onChange={(e) => setDateName(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                    required
                                    />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={DateLocation}
                                    onChange={(e) => setDateLocation(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={DateDescription}
                                    onChange={(e) => setDateDescription(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <button
                                    type="submit"
                                    className="bg-zinc-500 hover:bg-zinc-400 text-white px-4 py-2 rounded-full font-bold"
                                >
                                    Add Date
                                </button>
                                </form>
                        </div>
                    </div>
                )}

                {editDateMode && selectedDate && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-amber-50 rounded-lg shadow-lg max-w-lg p-6 w-full relative size-max">
                            <button
                                onClick={onExit}
                                className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 font-bold"
                            >
                                X
                                </button>
                            <h2 className="text-2xl font-bold mb-4 text-zinc-500">Edit Date</h2>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (selectedDate) {
                                        await updateDate(
                                            selectedDate.id,
                                            DateName,
                                            DateLocation,
                                            DateDescription
                                        );
                                        setEditDateMode(false);
                                        setSelectedDate(null);
                                        setDateName('');
                                        setDateLocation('');
                                        setDateDescription('');
                                        const datesData = await getDates();
                                        setDates(datesData);
                                    }
                                }}
                                className="flex flex-col gap-4 text-zinc-500"
                                >
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={DateName}
                                    onChange={(e) => setDateName(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={DateLocation}
                                    onChange={(e) => setDateLocation(e.target.value)}
                                    className="p-2 border border-zinc-300 rounded"
                                    />
                                <textarea
                                    placeholder="Description"
                                    value={DateDescription}
                                    onChange={(e) => setDateDescription(e.target.value)}
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