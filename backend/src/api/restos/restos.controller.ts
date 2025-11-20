import { Request, Response } from 'express'; 
import { createResto, getRestos, getRestoById, updateResto, deleteResto } from './restos.service';

export const createRestoController = async (req: Request, res: Response) => {
    try {
        const { name, location, rating, cuisine, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const resto = await createResto(name, location, rating, cuisine, description);
        return res.status(201).json(resto);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create new restaurant' });
    }
};

export const getRestosController = async (req: Request, res: Response) => {
    try {
        const restos = await getRestos();
        return res.status(200).json(restos);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve restaurants' });
    }
};

export const getRestoByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }
        const resto = await getRestoById(id);
        if (!resto) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        return res.status(200).json(resto);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve restaurant' });
    }
};

export const updateRestoController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }
        const { name, location, rating, cuisine, description } = req.body;
        const resto = await updateResto(id, name, location, rating, cuisine, description);
        return res.status(200).json(resto);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update restaurant' });
    }
};

export const deleteRestoController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }
        await deleteResto(id);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete restaurant' });
    }
};


