const express = require('express')
const fs = require('fs');

const app = express()
const PORT = 8080
const path = "../desafio2/productos.txt"

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto: ${PORT}`)
})

function randomNum(max) {
    return Math.floor(Math.random() * max) ;
}
app.get('/productos', (req, res) => {
    try {
        let fileData = fs.readFileSync(path, 'utf-8')
        let parsedData = JSON.parse(fileData)
        res.send({parsedData})
    } catch(error) {
        console.log(error)
    }
})

app.get('/productosRandom', (req, res) => {
    try {
        let fileData = fs.readFileSync(path, 'utf-8')
        let parsedData = JSON.parse(fileData)
        let randomProd = parsedData[randomNum(Object.keys(parsedData).length)]
        res.send({randomProd})
    } catch(error) {
        console.log(error)
    }
})