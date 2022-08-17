
import options from '../options/SQlite3.js'
import knex from 'knex'

const database = knex(options)
class mManager {
    getAll = async () => {
        try {
            if(await database.schema.hasTable('messages')) {
                let products = await database('messages').select('*')
                return products
            } else {
                await database.schema.createTable('messages', table => {
                    table.string('author')
                    table.string('message')
                    table.string('date')
                }).then(() => console.log('table created'))
                .catch((error) => {console.log(error); throw error}).finally(() => {database.destroy()})
            }
        } catch (error) {console.log('Cannot reach database '+ error)}
    }
    addItem = async(item) => {
        try {
                await database('messages').insert(item)
        } catch (error)  {console.log('Cannot reach database '+ error)}
    }
}

export default mManager


