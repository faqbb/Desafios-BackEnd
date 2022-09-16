
const socket = io.connect()

socket.on('messages', data => {
    console.log(data)
})

function render(data) {
    const html = data.map((elem, index) =>{
        return(`<div>
                    <strong>${elem.author.id}</strong>:
                    <em>${elem.text}</em>
                </div>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html
}
socket.on('messages', function(data) {render(data)})

const addMessage = () => {
    const message = {
        author: { 
            id :document.getElementById('author').value,
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.datatype.number({ min: 18, max: 60}),
            alias: faker.internet.userName(),
            avatar: faker.internet.avatar()
        },
        text: document.getElementById('message').value,
        
    }
    socket.emit('new-message', message);
}
// PRODUCTOS
function renderProds(prods) {
    const html = prods.map((elem, index) =>{
        return(`<ul class="d-flex justify-content-between list-unstyled mx-5 text-light h6">
                    <li>${elem.name}</li>
                    <li>${elem.price}</li>
                    <li>${elem.imageUrl}</li>
                    <li>${elem.category}</li>
                </ul>    `)
    }).join(" ")
    console.log(html)
    document.getElementById('products').innerHTML = html
}
const addProduct = () => {
    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        imageUrl: document.getElementById('url').value,
        description: faker.commerce.productDescription(),
        category: faker.commerce.department()
    }
    socket.emit('new-product', product)
    return false
}

socket.on('products', function(productdata) {renderProds(productdata)})