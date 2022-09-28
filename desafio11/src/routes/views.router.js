import { Router } from "express";

const router = Router()
router.get('/', (req, res) => {
    if(!req.session.user){
        res.render('home')
    }else{
        res.redirect('/api/user')
    }
    
})
router.get('/api/register', (req, res) => {
    res.render('register')
})
router.get('/api/login', (req, res) => {
    res.render('login')
})
router.get('/api/user', (req,res) => {
    if(!req.session.user) return res.redirect('/login');
    res.render('user', {user: req.session.user})
})
router.get('/api/loginfail', (req,res) =>{
    res.render('loginFail')
})
router.get('/api/registerfail', (req,res) =>{
    res.render('registerFail')
})
export default router