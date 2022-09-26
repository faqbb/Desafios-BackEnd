import { Router } from "express";
import userService from "../models/User.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router()

router.post('/register', passport.authenticate('register',{failureRedirect:'/registerfail'}), async (req, res) => {
    res.send(result)
})
router.post('/login',passport.authenticate('login',{failureRedirect:'/loginfail'}), async (req, res) => {
            req.session.user = {
                name: req.user.name,
                email: req.user.email,
                id: req.user._Id
            }
            res.send({status:'success', payload: req.session.user})
        })

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

router.get('/github', (req,res) =>{

})

router.get('/githubcallback', (req,res) =>{
    
})
export default router