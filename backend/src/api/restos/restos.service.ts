import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export const createResto = async (name: string, location: string, cuisine: string, description: string) => {
    return prisma.resto.create({
        data: { name, location, cuisine, description },
    });
};

export const getRestos = async () => {
    return await prisma.resto.findMany();
};

export const getRestoById = async (id: number) => {
    return prisma.resto.findUnique({
        where: { id },
    });
};

export const updateResto = async (id: number, name: string, location: string, cuisine: string, description: string) => {
    return prisma.resto.update({
        where: { id },
        data: { name, location, cuisine, description },
    });
};

export const deleteResto = async (id: number) => {
    return prisma.resto.delete({
        where: { id },
    });
};