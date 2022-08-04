import  express  from "express";
import __dirname from "./utils.js";
import productRouter from "./routes/products.router.js"
const app = express()

const server = app.listen(8080,()=>console.log("Listening on 8080"))

app.set('views', __dirname+'/views')
app.set('view engine', 'pug')

app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use('/api/products', productRouter)

app.get('/', (req, res)=> {
    res.render('pugForm', {})
})

