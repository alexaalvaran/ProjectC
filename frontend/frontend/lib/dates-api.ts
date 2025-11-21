import { Date } from '../types/date';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export const getDates = async (): Promise<Date[]> => {
    const response = await fetch(`${BACKEND_URL}/api/dates`);
    if (!response.ok) {
        throw new Error('Failed to fetch dates');
    }
    return response.json();
};

export const getDateById = async (id: number): Promise<Date> => {
    const response = await fetch(`${BACKEND_URL}/api/dates/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch date');
    }
    return response.json();
};

export const createDate = async (name: string, location: string, description: string): Promise<Date> => {
    const response = await fetch(`${BACKEND_URL}/api/dates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, description }),
    });
    if (!response.ok) {
        throw new Error('Failed to create date');
    }
    return response.json();
};

export const updateDate = async (id: number, name: string, location: string, description: string): Promise<Date> => {
    const response = await fetch(`${BACKEND_URL}/api/dates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, description }),
    });
    if (!response.ok) {
        throw new Error('Failed to update date');
    }
    return response.json();
};

export const deleteDate = async (id: number): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/api/dates/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete date');
    }
};

