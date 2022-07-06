
const fs = require('fs');

const path = "./productos.txt"
class Container {
    getAll = async() =>{
        try {
            if(fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8')
                let products = JSON.parse(fileData)
                console.log(products)
                console.log(Object.keys(products).lenght)
                return products
            } else {
                return []
            }
        }
        catch(error) {
            console.log('Cannot read file: ' + error)
        }
    }
    addProd = async(prod) => {
       try{ 
        let prods = await this.getAll()
            console.log(prods.lenght)
                if (prods.lenght===undefined){
                    prod.id=1
                    prods.push(prod)
                    await fs.promises.writeFile(path, JSON.stringify(prods,null,'\t'))
                } else {
                    prod.id = prods[prods.lenght-1].id+1
                    prods.push(prod)
                    await fs.promises.writeFile(path, JSON.stringify(prods,null,'\t'))
                }
        } catch(error) {
            console.log(error)
        }
    }
    getById = async(idprop) => {
        try {
            let prods = await this.getAll()
            let object = prods.filter( product => product.id === idprop)
            return object 
        } catch(error) {
            console.log(error)
        }
    }
    deleteById = async(idprop) => {
        try {
            let prods = await this.getAll()
                if(prods.getById(idprop)) {
                    prods.filter( product => product.id !== idprop)
                    await fs.promises.writeFile(path, JSON.stringify(prods,null,'\t'))    
                } else {
                    console.log('There is not an object using that id')
                }
        } catch(error) {
            console.log(error)
        }
    }
    deleteAll = async() => {
        try {
            await fs.promises.writeFile(path, [])
        } catch(error) {
            console.log(error)
        }
    }

}

let milanesa = {
    title: "milanesa",
    price: 100,
    thumbnail: "defaultUrl1"
}

let papas = {
    title: "papas",
    price: 50,
    thumbnail: "defaultUrl2"
}

let pescado = {
    title: "pescado",
    price: 150,
    thumbnail: "defaultUrl3"
}

const productContainer = new Container()
const environment = async() => {
    let allProds = await productContainer.getAll()
    await productContainer.addProd(milanesa)
    await productContainer.getById(1)
    await productContainer.deleteById(1)
    await productContainer.deleteAll()
    console.log(allProds)
}

environment()