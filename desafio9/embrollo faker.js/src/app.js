import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import services from './dao/MongoDAO/handlers.js';
import getRandomMessages from '../utils/messageGenerator.js';
import getRandomProducts from '../utils/productGenerator.js';
import { normalize, schema } from 'normalizr';


const app = express()
const server = app.listen(8080, () => console.log('Listening on 8080'))
const io = new Server(server)
export default io


app.use(express.static('public'))

io.on('connection', async function(socket) {
    console.log('someone connected!')
    let messages = await services.messageService.getAll()
    socket.emit('messages', messages)
    socket.on('new-message', async message => {
        console.log(message)
        let newMessage = data
        await services.messageService.add(newMessage)
        let newMessages = await services.messageService.getAll()
        io.sockets.emit('messages', newMessages)
    })
})
app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.get('/', async (req,res) =>  {
    try {
        let productdata = await services.productService.getAll()
        io.on('connection', function(socket){
            socket.emit('products', productdata)
            socket.on('new-product', async data =>{
               const newProd = data
               await services.productService.add(newProd)
               let newProducts = services.productService.getAll()
               io.sockets.emit('products', newProducts)
            }) 
        })
        res.render('index', {})
    } catch(error) {
        console.log(error)
    }
})
app.post('/', async (req,res) => {
    let product = getRandomProducts(1)
    await services.productService.add(product)
    let products = await services.productService.getAll()
    res.send(products)
})

app.get('/normalize/msg', async(req, res) =>{
    const authorSchema = new schema.Entity('authors')
    const textSchema = new schema.Entity('texts')
    const messageSchema = new schema.Entity('messages', {
        author: authorSchema,
        text: textSchema
    })
    let messages = await services.messageService.getAll()
    const normalizedMessages = normalize(messages, messageSchema)
    res.send(normalizedMessages)
})
