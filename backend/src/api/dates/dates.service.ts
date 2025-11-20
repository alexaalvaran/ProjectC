import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

export const createDate = async (name: string, location: string, description: string) => {
    return prisma.date.create({
        data: { name, location, description },
    });
};

export const getDates = async () => {
    return await prisma.date.findMany();
};

export const getDateById = async (id: number) => { 
    return prisma.date.findUnique({
        where: { id },
    });
};

export const updateDate = async (id: number, name: string, location: string, description: string) => {
    return prisma.date.update({
        where: { id },
        data: { name, location, description },
    });
};

export const deleteDate = async (id: number) => {
    return prisma.date.delete({
        where: { id },
    });
};


