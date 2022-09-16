import MongoDBContainer from "./MongoDBContainer.js";
import mongoose from "mongoose";

const collection='messages'
const messagesSchema = mongoose.Schema({
    author: {
        id: String,
        name: String,
        lastName: String,
        age: Number,
        alias: String,
        avatar: String,
    },
    text: String
})

export default class products extends MongoDBContainer {
    constructor(){
        super(collection, messagesSchema)
    }
}