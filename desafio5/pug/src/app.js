import  express  from "express";
import __dirname from "./utils";
const app = express()

const server = app.listen(8080,()=>console.log("Listening on 8080"))

app.set('views', __dirname+'/views')
app.set('view engine', 'pug')

app.get("/",(req,res)=>{
    res.render('welcome.pug', {
        message:"Papa con queso"
    })
})

