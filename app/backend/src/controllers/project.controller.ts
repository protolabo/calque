import { Request, Response } from 'express';
import Project, { IProject } from '../models/project.model';
//import { IUser } from '../models/user.model'; // Assuming IUser interface is defined in user.model.ts
//import mongoose from 'mongoose'; //schema class and Document interface
// , { Schema, Document }

// Controller class 
class ProjectController {
    // GET all projects
    public async getAllProjects(req: Request, res: Response): Promise<void> {
        try {
            console.log(req)
            const projects: IProject[] = await Project.find({});
            res.json(projects);
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    // GET project by ID
    public async getProjectById(req: Request, res: Response): Promise<void> {
        try {
            const project: IProject | null = await Project.findOne({ title:req.params.id });
            if (!project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }
            res.json(project);
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }

    // POST create a new project
    public async createProject(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, content, creator } = req.body;
            // Check for required fields
            if (!title || !content) {
                res.status(400).json({ message: 'Title and content are required.' });
                return;
            }
            // Check if the project already exists
            const existingProject = await Project.findOne({ $or: [{ title }] });
            if (existingProject) {
                res.status(400).json({ message: 'Project already exists.' });
                return;
            }
            //create the document
            const newProject: IProject = new Project({
                title,
                description,
                content,
                creator // Assuming creator is the _id of a user
            });
            const savedProject: IProject = await newProject.save();
            res.status(201).json(savedProject);
        } catch (err:any) {
            res.status(400).json({ message: err.message });
        }
    }

    // PUT update project by ID
    public async updateProject(req: Request, res: Response): Promise<void> {
        try {
            const updatedProject: IProject | null = await Project.findOneAndUpdate({ title:req.params.id }, req.body, { new: true });
            if (!updatedProject) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }
            res.json(updatedProject);
        } catch (err:any) {
            res.status(400).json({ message: err.message });
        }
    }

    // DELETE project by ID
    public async deleteProject(req: Request, res: Response): Promise<void> {
        try {
            const deletedProject: IProject | null = await Project.findOneAndDelete({ title:req.params.id });
            if (!deletedProject) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }
            res.json({ message: 'Project deleted successfully' });
        } catch (err:any) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new ProjectController();
