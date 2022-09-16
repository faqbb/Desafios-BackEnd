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
    res.json(result)
})
router.post('/login', async (req, res) => {
    const {name, email, password} = req.body
    if(!name||!email||!password) return res.status(400).send({status:"error", error:"Incomplete form"})
    const exists = await userService.findOne({email:email})
    if(!exists) return res.status(400).send({status:"error", error: "User does not exist"})
    if (exists.email == email && exists.password == password) {
            req.session.user={
                email,
                role: "user"
            }
            // El problema es que es del cliente mando un header con su content-type y no se pueden setear nuevamente, res.send y res.redirect esperan un JSON
            return res.redirect("user")
        }
        else{
            console.log('contraseña o usuario incorrecto')
        }
    }
)

router.get('/user', (req,res) =>{
    if(req.session.user){
        loggedUser = req.session.user
        res.send(loggedUser)
    }
    else {
        res.status(400).send({status:"error", error: "User not logged in"})
        res.redirect('/login')
    }
})
router.get('/logout', (req,res) =>{
    req.session.destroy()
    res.redirect('../home')
})

export default router