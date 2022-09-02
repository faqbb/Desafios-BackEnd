import { Router } from "express";
import services from "../dao/index.js";


const router = Router()
const adminStatus = true

router.get('/', async (req,res) => {
    try {
        let products = await services.productsService.getAll()
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
        let product = await services.productsService.getById(propId)
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
            await services.productsService.add(newProd)
            res.send(newProd)
        } else {res.status(400).send({error: 'Unauthorized'})}
    } catch (error) {console.log(error)}
})

router.put('/:prodId', async(req, res) => {
    try {
        if(adminStatus === true) {
            let propId = req.params.prodId
            let updatedProd = req.body
            await services.productsService.updateById(propId, updatedProd)
            let result = await services.productsService.getById(propId)
            res.send(result)
        } else {res.status(400).send({error: 'Unauthorized'})}
    } catch (error) {console.log(error)}
})

router.delete('/:id', async(req,res) => {
    try {
        if(adminStatus === true) {
            let propId = req.params.id
            await services.productsService.deleteById(propId)
            let result = await services.productsService.getAll()
            res.send(result)
        } else {res.status(400).send({error: 'Unauthorized'})}
    } catch (error) {console.log(error)}
})

export default router