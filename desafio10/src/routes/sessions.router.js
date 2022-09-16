import { Router } from "express";
import userService from "../models/User.js";

const router = Router()

router.post('/register', async (req, res) => {
    const {name, email, password} = req.body
    if(!name||!email||!password) return res.status(400).send({status:"error", error:"Incomplete form"})
    const exists = await userService.findOne({email:email})
    if(exists) return res.status(400).send({status:"error", error: "User already exists"})
    const newUser = {
        name,
        email,
        password
    }
    let result = await userService.create(newUser)
    res.send(result)
})
router.post('/login', async (req, res) => {
    const {name, email, password} = req.body
    if(!name||!email||!password) return res.status(400).send({status:"error", error:"Incomplete form"})
    const exists = await userService.findOne({email:email})
    if(!exists) return res.status(400).send({status:"error", error: "User does not exist"})
    if (exists.email == email && exists.password == password) {
            console.log('logueado')}
        else{
            console.log('contraseña o usuario incorrecto')
        }
    }
)

export default router