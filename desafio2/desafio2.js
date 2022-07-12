
const fs = require('fs');

const path = "./productos.txt"
class Container {
    getAll = async() =>{
        try {
            if(fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8')
                let products = JSON.parse(fileData)
                return products
            } else {
                await fs.promises.writeFile(path, '[]')
                let readNewFile = await fs.promises.readFile(path, 'utf-8')
                return readNewFile
            }
        }
        catch(error) {
            console.log('Cannot read file: ' + error)
        }
    }
    addProd = async(prod) => {
       try{ 
        let prods = await this.getAll()
                if (Object.keys(prods).lenght === 0){
                    prod.id=1
                    prods.push(prod)
                    await fs.promises.writeFile(path, JSON.stringify(prods,null,'\t'))
                } else {
                    prod.id = Object.keys(prods).length +1
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
                if(prods.find(prod => prod.id === idprop)) {
                    let filteredProds = prods.filter( product => product.id !== idprop)
                    await fs.promises.writeFile(path, JSON.stringify(filteredProds,null,'\t'))    
                } else {
                    console.log('There is not an object using that id')
                }
        } catch(error) {
            console.log(error)
        }
    }
    deleteAll = async() => {
        try {
            await fs.promises.writeFile(path, '[]')
        } catch(error) {
            console.log(error)
        }
    }

}

let milanesa = {
    "title": "milanesa",
    "price": 100,
    "thumbnail": "defaultUrl1"
}
let hamburguesa = {
    "title": "hamburguesa",
    "price": 150,
    "thumbnail": "defaultUrl2"
}
let papasfritas = {
    "title": "papasfritas",
    "price": 75,
    "thumbnail": "defaultUrl3"
}


const productContainer = new Container()
const environment = async() => {
    await productContainer.addProd(milanesa)
    await productContainer.addProd(hamburguesa)
    await productContainer.addProd(papasfritas)
}
environment()