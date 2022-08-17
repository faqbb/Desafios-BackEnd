
import options from '../options/mariaDB.js'
import knex from 'knex'

const database = knex(options)
class Manager {
    getAll = async () => {
        try {
            if(await database.schema.hasTable('products')) {
                await database.from('products').select('*').then((rows) => {
                    let prods = []
                    for ( const row of rows) {
                        let product = {
                            id: row['id'],
                            name: row['name'],
                            price: row['price'],
                            url: row['url'],
                         }
                         prods.push(product)}
                    return prods
                }).then((prods) =>  {console.log(prods)}) 
                // Este .then me devuelve el console.log correctamente pero no puedo hacer return prods, no llega al app.js cuando invoco el metodo
                .catch((error) => {console.log(error); throw error})
            } else {
                await database.schema.createTable('products', table => {
                    table.increments('id')
                    table.string('name')
                    table.integer('price')
                    table.string('url')
                }).then(() => console.log('table created'))
                .catch((error) => {console.log(error); throw error}).finally(() => {database.destroy()})
            }
        } catch (error) {console.log('Cannot reach database '+ error)}
    }
    addItem = async(item) => {
        try {
                await database('products').insert(item)
        } catch (error)  {console.log('Cannot reach database '+ error)}
    }
}

export default Manager


