import express from 'express';
import os from 'os';
import cluster from 'cluster';

const CPUs = os.cpus().length;
const app = express();
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
    app.listen(8080,()=>console.log("Listening"))
}
app.get('/',(req,res)=>{
    res.send(`El proceso con pid ${process.pid} atendió esta consulta`)
})

app.get('/info', (req, res) =>{
    console.log(process.env)
    const processInfo = {
        args: process.argv.slice(2),
        path: process.argv[1],
        OS: process.env.OS,
        PID: process.pid,
        nodeV: process.versions.node,
        rss: process.memoryUsage.rss(),
        NUMBER_OF_PROCESSORS: process.env.NUMBER_OF_PROCESSORS
    }
    res.send(processInfo)
    
})

app.get('/suma',(req,res)=>{
    let suma = 0;
    for(let i=0;i<5e9;i++){
        suma+=i;
    }
    res.send(`Suma entregada con pid ${process.pid} con resultado ${suma}`)
})