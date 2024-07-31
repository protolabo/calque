// Import necessary modules and types
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model'; // Assuming IUser defines the user schema interface



class UserController {
    public welcomeMessage(req: Request, res: Response, next:NextFunction) {
        try {
            console.log(`
                call : ${req.originalUrl}
                `)
            next();

        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    // GET all users
    public async getAllUsers(req: Request , res: Response): Promise<void> {
        try {
            console.log(req)
            const users: IUser[] = await User.find({});
            //response
            //res.json(...) converts an array of objects to a json response that will be returned as a response
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

        try {
            // Destructure the properties from the request body
            const { username, email, password, fullName, bio, age, gender, location, interests, role, avatarUrl } = req.body;

            // Check for required fields
            if (!username || !email || !password) {
                res.status(400).json({ message: 'Username, email, and password are required.' });
                return;
            }

            // Check if the username or email already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                res.status(400).json({ message: 'Username or email already exists.' });
                return;
            }

            // Create a new user instance
            const newUser: IUser  = new User({
                username,
                email,
                password,
                fullName,
                bio,
                age,
                gender,
                location,
                interests,
                role,
                avatarUrl,
                isActive: true,
                createdAt: new Date(),
                lastLogin: null,
            });

            // Save the new user to the database
            await newUser.save();

            // Respond with the created user
            res.status(201).json(newUser);
        } 
        catch (error) {
            res.status(500).json({ message: 'Server error', error });
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
