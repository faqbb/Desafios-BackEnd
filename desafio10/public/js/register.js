const form = document.getElementById('registerForm')
form.addEventListener('submit', evt =>{
    evt.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value,key) => obj[key]= value);
    fetch('/api/register', {
        method:'POST',
        body: JSON.stringify(obj)
    }).then(result =>result.json()).then(json=>console.log(json))
})