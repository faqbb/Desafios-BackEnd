import express from "express";
import config from "./config/indexYargs.js";
import mainConfig from "./config/mainConfig.js";

const app = express()

const server = app.listen(config.port, () => {console.log(`Listening on ${config.port}`)})

app.get('/', (req, res) =>{
    res.send('holaa')
})

app.get('/info', (req, res) =>{
    const processInfo = {
        args: process.argv.slice(2),
        path: process.argv[1],
        OS: process.env.OS,
        PID: process.pid,
        nodeV: process.versions.node,
        root: "?",
        rss: process.memoryUsage.rss()
    }
    res.send(processInfo)
    
})