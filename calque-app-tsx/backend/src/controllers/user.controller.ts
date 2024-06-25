// Import necessary modules and types
import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model'; // Assuming IUser defines the user schema interface

// Interface for defining controller functions
interface UserControllerI {
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    createUser(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
}

// Controller class implementing UserController interface
class UserController implements UserControllerI {
    // GET all users
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users: IUser[] = await User.find();
            res.json(users);
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    // GET user by ID
    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser | null = await User.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    // POST create a new user
    public async createUser(req: Request, res: Response): Promise<void> {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            // other fields as needed
        });

        try {
            const savedUser: IUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err:any) {
            res.status(400).json({ message: err.message });
        }
    }

    // PUT update user by ID
    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(updatedUser);
        } catch (err:any) {
            res.status(400).json({ message: err.message });
        }
    }

    // DELETE user by ID
    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const deletedUser: IUser | null = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }
}

// Export an instance of UserController
export default new UserController();
