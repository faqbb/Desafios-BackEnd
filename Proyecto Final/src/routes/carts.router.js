import { Router } from "express";
import services from "../dao/index.js";

const router = Router()

router.get('/', async (req,res) => {
    try {
        let carts = await services.cartsService.getAll()
        if (!(carts)) {
            res.status(404).send({error: 'Failed to reach data'})
        } else {
            res.send({carts})
        }
    } catch (error)  {console.log(error)}
})
router.post('/', async(req,res) => {
    try {
        let newCart = await services.cartsService.addCart()
        res.send(newCart)
    } catch (error) {console.log(error)}
})

router.delete('/:id', async(req,res) =>{
    try {
        let propId = req.params.id
        await services.cartsService.deleteById(propId)
    } catch (error) {console.log(error)}
})

router.post('/:id/products', async(req,res) =>{
    try {
        let propId = req.params.id
        let newProd = req.body
        await services.cartsService.updateProdInCart(propId, newProd)
        let result = await services.cartsService.getAll()
        res.send(result)
    } catch (error) {console.log(error)}
})

export default router