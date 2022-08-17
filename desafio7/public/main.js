const socket = io.connect()

function render(data) {
    try {
        console.log(data)
        if(!(data.lenght)) {
        const html = data.map((elem, index) =>{
            return(`<div>
            <strong>${elem.author}</strong> <span>${elem.date}</span>:
            <em>${elem.message}</em>
            </div>`)
        }).join(" ")
        document.getElementById('messages').innerHTML = html
        } else {
            const html = 'No hay mensajes para mostrar'
            document.getElementById('messages').innerHTML = html
        }
    } catch (error) { console.log(error)}
}
socket.on('messages', function(data) {render(data)})

const addMessage = () => {
    const message = {
        author: document.getElementById('author').value,
        message: document.getElementById('message').value,
        date: new Date()
    }
    socket.emit('new-message', message);
    return false
}
// PRODUCTOS
function renderProds(prods) {
    const html = prods.map((elem, index) =>{
            return(`<ul class="d-flex justify-content-between list-unstyled mx-5 text-light h6">
            <li>${elem.name}</li>
            <li>${elem.price}</li>
            <li>${elem.url}</li>
            <li>${elem.id}</li>
            </ul>    `)
        }).join(" ")
    document.getElementById('products').innerHTML = html
}
const addProduct = () => {
    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        url: document.getElementById('url').value
    }
    socket.emit('new-product', product)
    return false
}

socket.on('products', function(products) {renderProds(products)})