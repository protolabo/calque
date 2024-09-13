import mongoose, { Schema, Document } from 'mongoose'; //schema class and Document interface
//import { IUser } from './user.model';  // Assuming user.model.ts exports IUser interface

// Interface for defining the Project document structure
export interface IProject extends Document {
    title: string;
    description: string;
    content: string;
    creator: string;  // Reference to User's ObjectId
    createdAt: Date;
    // Other project fields if any
}




//Note :
//Notice how we feed a JSON into the "new Schema({...});"
//It is because the JSON dictates to the Database what structure it should have
//It defers from the Interface
//
// Define the Mongoose schema for Project
const ProjectSchema: Schema = new Schema({
    title: {
        unique:true,
        type: String,
        required: true
    },
    description: {
        type: String,
        default:''
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: String, //type = object schema User
        default:'unknown'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define and export the Mongoose model for Project
const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
// the UserDocument type is automatically inferred by TypeScript