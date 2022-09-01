import MongoDBContainer from "./MongoDBContainer.js";
import mongoose from "mongoose";

const collection='products'
const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    url:String
})

export default class products extends MongoDBContainer {
    constructor(){
        super(collection, productsSchema)
    }
}