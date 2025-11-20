// test-prisma.ts
import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const notes = await prisma.note.findMany();
        console.log('All notes:', notes);

        const newNote = await prisma.note.create({
            data: { title: 'Test Note', description: 'This is a test note' },
        });
        console.log('Created note:', newNote);

        const noteById = await prisma.note.findUnique({
            where: { id: newNote.id },
        });
        console.log('Note by ID:', noteById);

        await prisma.note.delete({ where: { id: newNote.id } });
        console.log('Test note deleted successfully.');
    } catch (err) {
        console.error('Error with Prisma:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
