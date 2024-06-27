/*
Reminder : In NoSQL like databases like MongoDB, tables are called "Collections"

This collection represents the attributes and types associated with the entity User.

*/
import mongoose, { Schema, Document } from 'mongoose';

//
//
// Interface for defining the User document structure
//It acts as our ORM
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    fullName?: string;
    bio?: string;
    age?: number;
    gender?: 'Male' | 'Female' | 'Other';
    location?: string;
    interests?: string[];
    role: 'user' | 'admin';
    createdAt: Date;
    avatarUrl?: string;
    isActive: boolean;
    lastLogin?: Date | null;
}

// Define the Mongoose schema for User
const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        min: 13
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    location: {
        type: String,
        default: ''
    },
    interests: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
});

// Define and export the Mongoose model for User
//User = Model
//IUser = document interface
//userSchema = mongodb schema 
//UserDocument = implicitely defined
const User = mongoose.model<IUser>('User', userSchema);
export default User;
//User.find() returns instances of UserDocument that has the properties of IUser