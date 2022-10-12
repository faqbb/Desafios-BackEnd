import express from "express";
import config from "./config/indexYargs.js";
import {fork} from "child_process"

const app = express()

const server = app.listen(config.port, () => {console.log(`Listening on ${config.port}`)})

app.get('/api/randoms', (req, res) => {
    const child = fork('./src/randomNum.js')
        child.send('hola soy goku')
        child.on('message', val =>{
            res.send(`el resultado es ${val}`)
        })
})

app.get('/info', (req, res) =>{
    const processInfo = {
        args: process.argv.slice(2),
        path: process.argv[1],
        OS: process.env.OS,
        PID: process.pid,
        nodeV: process.versions.node,
        root: "?", // no encontre ninguna propiedad de process que me decuelva la carpeta desafio12 
        rss: process.memoryUsage.rss()
    }
    res.send(processInfo)
    
})