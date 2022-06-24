class Book {
    constructor(bookName,bookAuthor){
    this.bookName= bookName;
    this.bookAuthor= bookAuthor;
}}

class User{
    constructor(name,lastName){
        this.name= name;
        this.lastName= lastName;
        this.pets=[];
        this.books=[];
    }
    getFullName= function() {
        console.log(`${this.name} ${this.lastName}`)
    }
    addPet= function(petName) {
        this.pets.push(petName)
    }
    countPets= function() {
         console.log(Object.keys(this.pets).length)
    }
    addBook= function(bookName,bookAuthor) {
        let book1 = new Book(bookName, bookAuthor);
        this.books.push(book1)
    }
    getBookNames= function() {
        let bookNames = this.books.map( book => {
            return book.bookName
        })
        console.log(bookNames)
    }
}

let client1 = new User('Gonzalo', 'Gonzales')

    client1.getFullName()

    client1.addPet('Chicho')
    client1.addPet('Nora')
        client1.countPets()
    
    client1.addBook('El Quijote', 'Cervantes')
    client1.addBook('El Gato Negro', 'Edgar Allan Poe')
        client1.getBookNames()
    

