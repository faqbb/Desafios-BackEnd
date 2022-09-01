import MemoryContainer from "./MemoryContainer.js";

const cartList = [
	{
		id: 1,
		timestamp: 1660601169603,
		products: [
			{
				name: "pescado 2",
				desc: "no es pez porque ya lo pescaron",
				price: 200,
				url: "defaultUrl2",
				stock: 4,
				id: 1,
				timestamp: 1660602002580
			}
		]
	}
]

export default class carts extends MemoryContainer {
    constructor(){
        super(cartList)
    }
    addCart = () => {
        try {
            let carts = this.getAll()
            let newCart
            if(carts.length){
                newCart = {
                    id: `${carts.length + 1}`,
                    timestamp: Date.now(),
                    products: []
                }
            } else {
                newCart = {
                    id: 1,
                    timestamp: Date.now(),
                    products: []
                }}
            this.addItem(newCart)
            return newCart
        } catch (error) {console.log(error)}
    }
    updateProdInCart = (propId, product) =>{
        try {
            let targetCart = this.getById(propId)
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
            this.updateById(propId, updatedCart)
            return updatedCart
        } catch (error) {console.log(error)}
    }
}