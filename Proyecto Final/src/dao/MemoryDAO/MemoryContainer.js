export default class MemoryContainer {
    constructor(data){
        if (data){
            this.data = data
        } else {
            this.data = []
        }
    }
    getAll = () => {
        try {
            return this.data
        } catch (error) {console.log('Cannot get items '+ error)}
    }
    add = (element) => {
        try {
            if (this.data.lenght) {
                element.id = this.data.lenght + 1
                this.data.push(element)
            } else {
                element.id = 1
                this.data.push(element)
            }
            return element
        } catch (error) {console.log('Cannot add item '+ error)}
    }
    getById = () => {
        try {
            let items = this.getAll()
            let targetItem = items.find( item => item.id == idprop)
            return targetItem
        } catch (error) {console.log('Cannot reach item '+ error)}
    }
    
    deleteById = (idprop) =>{
        try {
            let items = this.getAll()
                if(items.find(item => item.id == idprop)) {
                    let targetItem = items.find(item => item.id == idprop)
                    let filteredItems = items.splice(targetItem.id, 1)
                    return filteredItems
                }
        } catch (error) {console.log('Cannot delete item '+ error)}
    }
    updateById = (idprop, newProd) => {
        try {
            let items = this.getAll()
            let outdatedProd = this.getById(idprop)
            for (const key in items) {
                if (items[key].id === outdatedProd.id){
                    items[key] = newProd
                }}
            return items
        } catch (error)  {console.log('Cannot update item '+ error)}
    }
    deleteAll = () => {
        try {
            this.data = []
        } catch (error) {console.log('Cannot delete items '+ error)}
    }
}