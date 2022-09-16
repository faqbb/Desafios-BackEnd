import mongoose, { mongo } from "mongoose";

const collection = 'Users'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const userService = mongoose.model(collection,userSchema)

export default userService