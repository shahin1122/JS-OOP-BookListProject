// Book constructor
function Book(title, author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}





// UI Constructor

function UI(){

}

UI.prototype.addBookToList = function(book){
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


//  Show alert 
UI.prototype.showAlert = function(message , className) {
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


//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}

//  ClearField

UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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




