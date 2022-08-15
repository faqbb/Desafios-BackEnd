import { Router } from "express";
import Manager from '../helpers/productManager.js'


const router = Router()
const productManager = new Manager
const path ='./src/res/readable/products.json'
const adminStatus = true

router.get('/', async (req,res) => {
    try {
        let products = await productManager.getAll(path)
        if (!(products)) {
            res.status(404).send({error: 'Failed to read data'})
        } else {
            res.send({products})
        }
    } catch (error)  {console.log(error)}
})

router.get('/:id', async (req,res) => {
    try {
        let propId = req.params.id
        let product = await productManager.getById(propId, path)
        if (!(product)) {
            res.status(404).send({error: 'Failed to read data'})
        } else {
            res.send(product)
        }
    } catch (error)  {console.log(error)}
})

router.post('/', async(req, res) => {
    try {
        if(adminStatus === true) {
            let newProd = req.body
            await productManager.addItem(newProd, path)
        } else {res.status(400).send({error: 'Unauthorized'})}
    } catch (error) {console.log(error)}
})

router.put('/:prodId', async(req, res) => {
    try {
        if(adminStatus === true) {
            let propId = req.params.prodId
            let updatedProd = req.body
            await productManager.updateById(propId, updatedProd, path)
        } else {res.status(400).send({error: 'Unauthorized'})}
    } catch (error) {console.log(error)}
})

router.delete('/:id', async(req,res) => {
    try {
        if(adminStatus === true) {
            let propId = req.params.id
            await productManager.deleteById(propId, path)
        } else {res.status(400).send({error: 'Unauthorized'})}
    } catch (error) {console.log(error)}
})

export default router