import { Router } from "express";
import Manager from '../helpers/productManager.js'

const router = Router()
const productManager = new Manager
const path ='./src/res/readable/carts.json'

router.get('/', async (req,res) => {
    try {
        let carts = await productManager.getAll(path)
        if (!(carts)) {
            res.status(404).send({error: 'Failed to read data'})
        } else {
            res.send({carts})
        }
    } catch (error)  {console.log(error)}
})
router.post('/', async(req,res) => {
    try {
        let carts = await productManager.getAll(path)
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
        await productManager.addItem(newCart, path)
        res.send(newCart)
    } catch (error) {console.log(error)}
})

router.delete('/:id', async(req,res) =>{
    try {
        let propId = req.params.id
        await productManager.deleteById(propId, path)
    } catch (error) {console.log(error)}
})

router.post('/:id/products', async(req,res) =>{
    try {
        let propId = req.params.id
        let targetCart = await productManager.getById(propId, path)
        let updatedCart = targetCart
        let newProd
        if(targetCart.products.length){
            newProd = req.body
            newProd.id= targetCart.products.length + 1
            newProd.timestamp= Date.now()

        } else {
            newProd = req.body
            newProd.id= targetCart.products.length + 1
            newProd.timestamp= Date.now()
            }
        updatedCart.products.push(newProd)
        await productManager.updateById(propId, updatedCart, path)
    } catch (error) {console.log(error)}
})

export default router