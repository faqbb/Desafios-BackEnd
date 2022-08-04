import { Router } from "express";
import fs from 'fs'

const router = Router()
const path = "src/products.json"

router.get('/', (req,res) =>  {
    try {
        let fileData = fs.readFileSync(path, 'utf-8')
        let parsedData = JSON.parse(fileData)
        res.render('prods',{
            products: parsedData
        })    
    } catch(error) {
        console.log(error)
    }
})

router.get('/:prodID', (req,res) => {
    try {
        let wantedId = req.params.prodID
        let fileData = fs.readFileSync(path, 'utf-8')
        let parsedData = JSON.parse(fileData)
        let wantedProd
        for ( const key in parsedData){
            if (parsedData[key].id === wantedId) {
                wantedProd = parsedData[key]
            }
            else {continue}
        }
        if(wantedProd){
            res.send(wantedProd)
        } else {
            return res.status(400).send({error: 'el ID proporcionado no coincide con ningun producto'})
        }
    }
    catch(error) {
        console.log(error)
    }
})

router.post('/',  (req, res) => {
    let fileData = fs.readFileSync(path, 'utf-8')
    let parsedData = JSON.parse(fileData)
    console.log(req.body)
    let newProd =  req.body
    newProd.id = `${Object.keys(parsedData).length +1}`
    parsedData.push(newProd)
    fs.writeFileSync(path, JSON.stringify(parsedData, null,'\t'))
    res.send(newProd)
})

router.post('/:prodID', (req, res) => {
try {    
    let fileData = fs.readFileSync(path, 'utf-8')
    let parsedData = JSON.parse(fileData)
    let updatedProd = req.body
    updatedProd.id = req.params.prodID
    let updateCheck = false
    for (const key in parsedData) {
        if (parsedData[key].id === req.params.prodID) {
            parsedData[key] = updatedProd
            updateCheck = true
        } else {continue}
    } 
    if(updateCheck) {
        fs.writeFileSync(path, JSON.stringify(parsedData, null,'\t'))
        res.send(parsedData)
    } else {
        return res.status(400).send({error: 'el ID proporcionado no coincide con ningun producto'})
    }
} catch (error) {
    console.log(error)
}})

router.delete('/:prodID', (req, res) => {
    try {
        let fileData = fs.readFileSync(path, 'utf-8')
        let parsedData = JSON.parse(fileData)
        let updateCheck
        for (const key in parsedData) {
            if (parsedData[key].id === req.params.prodID) {
                parsedData.splice(parsedData[key],1)
                updateCheck = true
            } else {continue}
        } 
        if(updateCheck) {
            fs.writeFileSync(path, JSON.stringify(parsedData, null,'\t'))
            res.send(parsedData)
        } else {
            return res.status(400).send({error: 'el ID proporcionado no coincide con ningun producto'})
        }
    } catch(error) {console.log(error)}
})

export default router