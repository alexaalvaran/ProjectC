import { Resto } from '../types/resto'; 

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export const getRestos = async (): Promise<Resto[]> => {
    const response = await fetch(`${BACKEND_URL}/api/restos`);
    if (!response.ok) {
        throw new Error('Failed to fetch restos');
    }
    return response.json();
};

export const getRestoById = async (id: number): Promise<Resto> => {
    const response = await fetch(`${BACKEND_URL}/api/restos/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch resto');
    }
    return response.json();
};

export const createResto = async (name: string, location: string, rating: number, cuisine: string, description:string): Promise<Resto> => {
    const response = await fetch(`${BACKEND_URL}/api/restos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, rating, cuisine, description }),
    });
    if (!response.ok) {
        throw new Error('Failed to create resto');
    }
    return response.json();
};

export const updateResto = async (id: number, name: string, location: string, rating: number, cuisine: string, description:string): Promise<Resto> => {
    const response = await fetch(`${BACKEND_URL}/api/restos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, rating, cuisine, description }),
    });
    if (!response.ok) {
        throw new Error('Failed to update resto');
    }
    return response.json();
};

export const deleteResto = async (id: number): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/api/restos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete resto');
    }
};
