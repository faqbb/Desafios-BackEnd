import FilesContainer from "./FilesContainer.js";
const cartsPath = 'src/res/readable/carts.json'

export default class carts extends FilesContainer {
    constructor(){
        super(cartsPath)
    }
    addCart = async() => {
        try {
            let carts = await this.getAll()
            let newCart
            if(Object.keys(carts).length){
                newCart = {
                    id: `${Object.keys(carts).length + 1}`,
                    timestamp: Date.now(),
                    products: []
                }
            } else {
                newCart = {
                    id: 1,
                    timestamp: Date.now(),
                    products: []
                }}
            await this.addItem(newCart)
            return newCart
        } catch (error) {console.log(error)}
    }
    updateProdInCart = async(propId, product) =>{
        try {
            let targetCart = await this.getById(propId)
            let updatedCart = targetCart
            let newProd
            if(targetCart.products.length){
                newProd = product
                newProd.id= targetCart.products.length + 1
                newProd.timestamp= Date.now()  
            } else {
                newProd = product
                newProd.id= targetCart.products.length + 1
                newProd.timestamp= Date.now()
                }
            updatedCart.products.push(newProd)
            await this.updateById(propId, updatedCart)
            return updatedCart
        } catch (error) {console.log(error)}
    }
}