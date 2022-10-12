process.on('message', info => {
    console.log('entro')
    let randomArray = []
    if(cant){
        for (let i = 0; i < cant; i++) {
            let num = Math.floor(Math.random() * 1000)
            randomArray.push(num)
        }
        process.send(randomArray)
    } else {
        for (let i = 0; i < 1e8; i++) {
            let num = Math.floor(Math.random() * 1000)
            randomArray.push(num)
        }
        process.send(randomArray)
    }            
})