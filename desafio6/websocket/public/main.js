const socket = io.connect()
socket.on('messages', data => {
    console.log(data)
})

function render(data) {
    const html = data.map((elem, index) =>{
        return(`<div>
                    <strong>${elem.author}</strong> <span>${elem.date}</span>:
                    <em>${elem.message}</em>
                </div>`)
    }).join(" ")
    document.getElementById('messages').innerHTML = html
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
    console.log(html)
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

socket.on('products', function(parseData) {renderProds(parseData)})