
import options from '../options/mariaDB.js'
import knex from 'knex'

const database = knex(options)
class pManager {
    getAll = async () => {
        try {
            if(await database.schema.hasTable('products')) {
                let products = await database('products').select('*')
                return products
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

export default pManager


