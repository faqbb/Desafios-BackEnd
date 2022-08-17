import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import pManager from '../helpers/productManager.js'
import mManager from '../helpers/messageManager.js';

const app = express()
const server = app.listen(8080, () => console.log('Listening on 8080'))
const io = new Server(server)
const productManager = new pManager
const messageManager = new mManager

app.use(express.static('public'))

io.on('connection', async function(socket) {
    let messages = await messageManager.getAll()
    console.log('someone connected!')
    socket.emit('messages', messages)
    socket.on('new-message', async (data) => {
        const newMessage = data
        await messageManager.addItem(newMessage)
        let newMessages = await messageManager.getAll()
        io.sockets.emit('messages', newMessages)
    })
})
app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.get('/', async (req,res) =>  {
    try {
        let products = await productManager.getAll()
        io.on('connection', function(socket){
            socket.emit('products', products)
            socket.on('new-product', async (data) =>{
               const newProd = data
               await productManager.addItem(newProd)
               let newProds = await productManager.getAll()
               io.sockets.emit('products', newProds)
            }) 
        })
        res.render('index', {})
    } catch(error) {
        console.log(error)
    }
})
