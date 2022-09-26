import express from 'express'
import __dirname from './utils.js'
import viewsRouter from "./routes/views.router.js";
import session from 'express-session'
import sessionsRouter from './routes/sessions.router.js'
import mongoose from "mongoose";
import MongoStore from 'connect-mongo'
import initializePassport from './config/passport.config.js';
import passport from 'passport';

const app = express()

const connection = mongoose.connect('mongodb+srv://facundito:facundito@cluster0.a6edqvs.mongodb.net/?retryWrites=true&w=majority')

app.use(express.json())
app.use(express.static('public'))
app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://facundito:facundito@cluster0.a6edqvs.mongodb.net/mocksession?retryWrites=true&w=majority',
        ttl:25
    }),
    secret:"usersession",
    resave: true,
    saveUninitialized: true
}))

initializePassport()

app.set('view engine','ejs')
app.set('views',__dirname+'/views')

const server = app.listen(8080,() => console.log('Listening'))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', viewsRouter)
app.use('/api', sessionsRouter)