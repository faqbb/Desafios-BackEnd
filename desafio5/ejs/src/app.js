import express from 'express';
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js'
const app = express()

const server = app.listen(8080,() => console.log('Listening on 8080'))

app.use(express.json())
app.use('/api/products', productsRouter)

app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.get('/',(req,res)=> {
    res.render('form',{})
})
