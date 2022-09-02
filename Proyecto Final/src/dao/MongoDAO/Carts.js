import MongoDBContainer from "./MongoDBContainer.js";
import mongoose from "mongoose";

const collection='carts'
const cartsSchema = mongoose.Schema({
    timestamp:Number,
    products: [{
        name: String,
        desc: String,
        price: Number,
        url: String,
        timestamp: Number,
        id: Number
    }]
})

export default class carts extends MongoDBContainer {
    constructor(){
        super(collection, cartsSchema)
    }
    updateProdInCart = async(idprop, prod) =>{
        try {
            let targetCart = await this.getById(idprop)
            let updatedCart = targetCart
            let newProd = prod
            newProd.timestamp= Date.now()            
            updatedCart.products.push(newProd)
            await this.updateById(idprop, updatedCart)
            return updatedCart
        } catch (error) {console.log(error)}
    }
    addCart = async() => {
        let newCart = {
            timestamp : Date.now(),
            products : []
        }
        await this.add(newCart)
        return newCart
    }
}


