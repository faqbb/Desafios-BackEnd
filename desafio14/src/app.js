import express  from "express";
import winston from "winston";
import os from 'os';
import cluster from 'cluster';
import compression from 'compression'
import { info } from "console";
import run from "../profiling/autocannonTest.js";

const app = express()
const PORT = process.env.PORT || 8080
const CPUs = os.cpus().length;
// app.use(compression()) TARDA 9MS EN LA PETICION GET /INFO COMPRIMIDO Y 4MS SIN COMPRIMIR

const logger = winston.createLogger({
    levels:{
        error: 0,
        warning:1,
        info: 2
    },
    transports:[
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({level: 'warning', filename:'warn.log'}),
        new winston.transports.File({level: 'error', filename: 'error.log'})
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({all: true}),
        winston.format.printf(info => 
            `timestamp: ${info.timestamp} PID: ${process.pid} path: ${process.argv[1]} message: ${info.message} `
            )
    )
})

if(cluster.isPrimary){
    console.log(`Soy un proceso primario con pid ${process.pid}`);
    for(let i=0;i<CPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',worker=>{
        console.log(`Murió el proceso worker con pid ${worker.process.pid}`)
        cluster.fork();
    })
}
else{
    console.log(`Soy un proceso worker con pid ${process.pid}`)
    app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
}
app.get('/',(req,res)=>{
    res.send(`El proceso con pid ${process.pid} atendió esta consulta`)   
})


app.get('/info', (req, res) =>{
    logger.info('/info arranca')
    const processInfo = {
        args: process.argv.slice(2),
        path: process.argv[1],
        OS: process.env.OS,
        PID: process.pid,
        nodeV: process.versions.node,
        rss: process.memoryUsage.rss(),
        NUMBER_OF_PROCESSORS: process.env.NUMBER_OF_PROCESSORS
    }
    if(!processInfo){logger.error('missing info')}
    res.send(processInfo)
})

app.get('/suma',(req,res)=>{
    logger.info('/suma arranca')
    let suma = 0;
    for(let i=0;i<5e5;i++){
        suma+=i;
    }
    if(!suma){logger.error('failed kindergarten')}
    res.send(`Suma entregada con pid ${process.pid} con resultado ${suma}`)
})

app.get('*', (req,res) =>{
    logger.warning('non-existant route reached')
    res.status(404).send('???')
})

