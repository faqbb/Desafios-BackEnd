import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import fs from 'fs'

const app = express()
const server = app.listen(8080, () => console.log('Listening on 8080'))
const io = new Server(server)
const path = "src/products.json"

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

app.get('/', (req,res) =>  {
    try {
        let fileData = fs.readFileSync(path, 'utf-8')
        let parsedData = JSON.parse(fileData)
        io.on('connection', function(socket){
            socket.emit('products', parsedData)
            socket.on('new-product', data =>{
               const newProd = data
               newProd.id = `${Object.keys(parsedData).length +1}`
               parsedData.push(newProd)
               fs.writeFileSync(path, JSON.stringify(parsedData, null,'\t'))
               io.sockets.emit('products', parsedData)
            }) 
        })
        res.render('index', {})
    } catch(error) {
        console.log(error)
    }
})
