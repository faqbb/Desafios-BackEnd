import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import Manager from '../helpers/productManager.js'

const app = express()
const server = app.listen(8080, () => console.log('Listening on 8080'))
const io = new Server(server)
const productManager = new Manager

app.use(express.static('public'))
const today =new Date()
const messages = [
    {author: 'juan@gmail.com' , message:'Hola', date: today},
    {author: 'pedro@gmail.com' , message:'¿Como estas?', date: today},
    {author: 'juan@gmail.com' , message:'Bien, ¿y vos?', date: today}
]

io.on('connection', function(socket) {
    console.log('someone connected!')
    socket.emit('messages', messages)
    socket.on('new-message', data => {
        messages.push(data)
        io.sockets.emit('messages', messages)
    })
})
app.set('views',__dirname+'/views')
app.set('view engine','ejs')

app.get('/', async (req,res) =>  {
    try {
        let products = await productManager.getAll()
        // products tendria que estar definido con los datos que estan en la consola (un array de objetos) pero su valor es null
        console.log(products)
        io.on('connection', function(socket){
            socket.emit('products', products)
            socket.on('new-product', data =>{
               const newProd = data
               productManager.addItem(newProd)
               let newProds = productManager.getAll()
               io.sockets.emit('products', newProds)
            }) 
        })
        res.render('index', {})
    } catch(error) {
        console.log(error)
    }
})
