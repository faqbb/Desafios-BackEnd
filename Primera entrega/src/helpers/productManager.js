import fs from 'fs'


class Manager {
    getAll = async(path) => {
        try {
            if(fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8')
                let parsedData = JSON.parse(fileData)
                return parsedData
            } else {
                await fs.promises.writeFile(path, '[]')
                let newData = await fs.promises.readFile(path, 'utf-8')
                return newData
            }
        } catch (error) {console.log('Cannot read file'+ error)}
    }
    addItem = async(item, path) => {
        try {
            let items = await this.getAll(path)
                if(Object.keys(items).length === 0){
                    item.id = 1
                    item.timestamp = Date.now()
                    items.push(item)
                    await fs.promises.writeFile(path, JSON.stringify(items,null,'\t'))
                } else {
                    item.id = Object.keys(items).length +1
                    item.timestamp = Date.now()
                    items.push(item)
                    await fs.promises.writeFile(path, JSON.stringify(items,null,'\t'))
                }
        } catch (error)  {console.log('Cannot read file'+ error)}
    }
    getById = async(idprop, path) => {
        try {
            let items = await this.getAll(path)
            let targetItem = items.find( item => item.id == idprop)
            return targetItem
        } catch (error) {console.log('Cannot read file '+ error)}
    }
    updateById = async(idprop, newProd, path) => {
        try {
            let items = await this.getAll(path)
            let outdatedProd = await this.getById(idprop, path)
            for (const key in items) {
                if (items[key].id === outdatedProd.id){
                    items[key] = newProd
                }}
            await fs.promises.writeFile(path, JSON.stringify(items,null,'\t'))
        } catch (error)  {console.log('Cannot read file'+ error)}
    }
    deleteById = async(idprop, path) => {
        try {
            let items = await this.getAll(path)
                if(items.find(item => item.id == idprop)) {
                    let targetItem = items.find(item => item.id == idprop)
                    let filteredItems = items.splice(targetItem.id, 1)
                    console.log(filteredItems)
                    await fs.promises.writeFile(path, JSON.stringify(filteredItems,null,'\t'))
                }
        } catch (error) {console.log('Cannot read file'+ error)}
    }
    deleteAll = async(path) => {
        try {
            await fs.promises.writeFile(path, '[]')
        } catch (error) {console.log('Cannot read file'+ error)}
    }
}
export default Manager

