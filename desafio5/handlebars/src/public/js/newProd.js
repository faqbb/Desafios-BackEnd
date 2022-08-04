let form = document.getElementById('prodForm');
    form.addEventListener('submit', evt => {
        evt.preventDefault()
        let name = document.getElementById('name').value
        let price = document.getElementById('price').value
        let url = document.getElementById('url').value
        let data = {
            name,
            price,
            url
        }
        let parsedData = JSON.stringify(data)
        fetch('/api/products', {
            method: 'POST',
            body: parsedData,
                headers: {
                    "Content-Type": "application/json"
                }            
        }).then(result=> result.json()).then(json=>console.log(json))
    })