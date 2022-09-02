import mongoose from "mongoose";


export default class MongoDBContainer{
    constructor(collection, schema){
        mongoose.connect('mongodb://127.0.0.1:27017/coderproyect')
        this.model = mongoose.model(collection, schema)
    }
    getAll = async() => {
        try {             
            let results = await this.model.find()
            return results
        } catch (error) {console.log(error)}
    }
    add = async(document) => {
        try {
            let results = await this.model.create(document)
            return results
        } catch (error){console.log(error)}
    }
    getById = async(idprop) => {
        try {
            let targetItem = await this.model.findById(idprop)
            return targetItem
        } catch (error) {console.log(error)}
    }
    deleteById = async(idprop) => {
        try {
            let targetItem = await this.model.findByIdAndDelete(idprop)
            return targetItem
        } catch (error) {console.log(error)}
    }
    updateById = async(idprop, newDoc) => {
        try {
            let targetItem = await this.model.findByIdAndUpdate(idprop, newDoc)
            return targetItem
        } catch (error) {console.log(error)}
    }
}
