import express from 'express'
import prodsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()
app.use(express.json())

const server = app.listen(8080, () => console.log('Listening on 8080'))

app.use('/api/products', prodsRouter)
app.use('/api/cart', cartsRouter)