import fs from 'fs'
export default class FilesContainer {
    constructor(path) {
        this.path = path
    }
    getAll = async() => {
        try {
            if(fs.existsSync(this.path)) {
                let fileData = await fs.promises.readFile(this.path, 'utf-8')
                let parsedData = JSON.parse(fileData)
                return parsedData
            } else {
                await fs.promises.writeFile(this.path, '[]')
                let newData = await fs.promises.readFile(this.path, 'utf-8')
                return newData
            }
        } catch (error) {console.log('Cannot read file'+ error)}
    }
    add = async(item) => {
        try {
            let items = await this.getAll()
                if(Object.keys(items).length === 0){
                    item.id = 1
                    item.timestamp = Date.now()
                    items.push(item)
                    await fs.promises.writeFile(this.path, JSON.stringify(items,null,'\t'))
                } else {
                    item.id = Object.keys(items).length +1
                    item.timestamp = Date.now()
                    items.push(item)
                    await fs.promises.writeFile(this.path, JSON.stringify(items,null,'\t'))
                }
        } catch (error)  {console.log('Cannot read file'+ error)}
    }
    getById = async(idprop) => {
        try {
            let items = await this.getAll()
            let targetItem = items.find( item => item.id == idprop)
            return targetItem
        } catch (error) {console.log('Cannot read file '+ error)}
    }

    updateById = async(idprop, newProd) => {
        try {
            let items = await this.getAll()
            let outdatedProd = await this.getById(idprop)
            for (const key in items) {
                if (items[key].id === outdatedProd.id){
                    items[key] = newProd
                }}
            await fs.promises.writeFile(this.path, JSON.stringify(items,null,'\t'))
        } catch (error)  {console.log('Cannot read file'+ error)}
    }
    deleteById = async(idprop) => {
        try {
            let items = await this.getAll()
                if(items.find(item => item.id == idprop)) {
                    let targetItem = items.find(item => item.id == idprop)
                    let filteredItems = items.splice(targetItem.id, 1)
                    await fs.promises.writeFile(this.path, JSON.stringify(filteredItems,null,'\t'))
                }
        } catch (error) {console.log('Cannot read file'+ error)}
    }
    deleteAll = async(path) => {
        try {
            await fs.promises.writeFile(path, '[]')
        } catch (error) {console.log('Cannot read file'+ error)}
    }
}