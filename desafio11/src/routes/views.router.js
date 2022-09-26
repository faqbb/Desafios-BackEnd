import { Router } from "express";

const router = Router()
router.get('/', (req, res) => {
    res.render('home')
})
router.get('/api/register', (req, res) => {
    res.render('register')
})
router.get('/api/login', (req, res) => {
    res.render('login')
})
router.get('/api/user', (req,res) => {
    res.render('user')
})
router.get('/api/loginfail', (req,res) =>{
    res.render('login.fail')
})
router.get('/api/registerfail', (req,res) =>{
    res.render('register.fail')
})
export default router