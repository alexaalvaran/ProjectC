import { PrismaClient } from '../../generated/prisma/client';


const prisma = new PrismaClient();

export const createNote = async (title: string, description: string) => {
	return prisma.note.create({
		data: { title, description },
	});
};

export const getNotes = async () => {
    return await prisma.note.findMany();
};

export const getNoteById = async (id: number) => {
	return prisma.note.findUnique({
		where: { id },
	});
};

export const updateNote = async (id: number, title: string, description: string) => {
	return prisma.note.update({
		where: { id },
		data: { title, description },
	});
};

export const deleteNote = async (id: number) => {
	return prisma.note.delete({
		where: { id },
	});
};
