import { Request, Response } from 'express'; 
import { createDate, getDates, getDateById, updateDate, deleteDate } from './dates.service';

export const createDateController = async (req: Request, res: Response) => {
    try {
        const { name, location, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const date = await createDate(name, location, description);
        return res.status(201).json(date);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create new date idea' });
    }
};

export const getDatesController = async (req: Request, res: Response) => {
    try {
        const dates = await getDates();
        return res.status(200).json(dates);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve date ideas' });
    }
};

export const getDateByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid date idea ID' });
        }
        const date = await getDateById(id);
        if (!date) {
            return res.status(404).json({ message: 'Date idea not found' });
        }
        return res.status(200).json(date);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve date idea' });
    }
};

export const updateDateController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid date idea ID' });
        }
        const { name, location, description } = req.body;
        const date = await updateDate(id, name, location, description);
        return res.status(200).json(date);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update date idea' });
    }
};

export const deleteDateController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid date idea ID' });
        }
        await deleteDate(id);
        return res.status(204).send();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete date idea' });
    }
};