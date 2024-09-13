import express from 'express';
import ProjectController from '../controllers/project.controller';

const router = express.Router();

// Route: GET all projects
router.get('/', ProjectController.getAllProjects);

// Route: GET project by ID
router.get('/:id', ProjectController.getProjectById);

// Route: POST create a new project
router.post('/', ProjectController.createProject);

// Route: PUT update project by ID
router.put('/:id', ProjectController.updateProject);

// Route: DELETE project by ID
router.delete('/:id', ProjectController.deleteProject);

export default router;
