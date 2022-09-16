const {default: MongoProducts} = await import('./Products.js')
const {default: MongoMessages} = await import('./Messages.js')


let productService = new MongoProducts()
let messageService = new  MongoMessages()

const services = {
    productService,
    messageService
}

export default services
