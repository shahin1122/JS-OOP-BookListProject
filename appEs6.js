class Book {
    constructor(title, author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
        addBookToList(book){
            // console.log(book);
        const list = document.getElementById('book-list');
        //Create element
        const row = document.createElement('tr');
        // console.log(row);

        
        //Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `

        list.appendChild(row);

    }

    showAlert(message , className){
         // cleate a div
        const div = document.createElement('div')
        div.className = `alert ${className}`;

        // added text
        div.appendChild(document.createTextNode(message));

        // get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div , form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);

    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
        }

    }

    clearField(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }


}

///////////////////////////Local Storage ////////////////////////////

class Store {
    static getBooks(){
        let books; 
        if(localStorage.getItem('book') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books ; 

    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book)=>{
            const ui = new UI();

            //added book to ui
            ui.addBookToList(book);
        });

    }

    static addBook(book){
        const books = Store.getBooks();
        // console.log(books)
        books.push(book);
        localStorage.setItem('books' , JSON.stringify(books));

    }

    static removeBook(){

    }
}


// DOM load event
document.addEventListener('DOMContentLoaded' , Store.displayBooks);








// Event listners for adding book
document.getElementById('book-form').addEventListener('submit' , function(e){
    // console.log('Test')
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    //console.log(book)

    const ui = new UI();

    
    // validate
    if(title === '' || author === '' || isbn === ''){
        //Error alert
        ui.showAlert('Please fill in the filds!' , 'error animate__animated animate__bounce');
    }else{
         // add book to list 
        ui.addBookToList(book);

        // Added to LS
        Store.addBook(book);


        ui.showAlert('Book Added!' , 'success animate__animated animate__bounce');

        ui.clearField();

    }

   



    e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click' ,function(e){
    // console.log(123);

    const ui = new UI();
    ui.deleteBook(e.target);

    ui.showAlert('Book Removed ! ' , 'success animate__animated animate__bounce')

    e.preventDefault();
})
