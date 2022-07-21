import express from 'express';
import productsRouter from './routes/products.router.js'


const app = express()
app.use(express.json())

const server = app.listen(8080,() => console.log('Listening on 8080'))

app.use('/api/products', productsRouter)
