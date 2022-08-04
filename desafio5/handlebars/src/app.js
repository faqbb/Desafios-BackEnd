import express from 'express'
import __dirname from './utils.js';
import { Router } from 'express';
import handlebars from 'express-handlebars'
import productRouter from './routes/products.router.js'

const app = express();

app.use(express.static(__dirname+'/public'))
app.use(express.json())

const server = app.listen(8080,() => console.log('Listening on 8080'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine','handlebars')

app.get('/' , (req,res) => {
    res.render('pugForm',{})
})

app.use('/api/products', productRouter )