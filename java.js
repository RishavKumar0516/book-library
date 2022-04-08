console.log("these is what, we are doing, creating a library website");
showlibrary();
function showlibrary(){
    let stoke = localStorage.getItem("stoke");
    if(stoke == null){
        stokeObj = [];
    }
    else{
        stokeObj = JSON.parse(stoke);
    }
    let html = "";
    stokeObj.forEach(function(element, index) {
        html += `<tr>
                  <td>${element.name}</td>
                  <td>${element.author}</td>
                  <td>${element.type}</td>
                  <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete</button></td>
                 </tr> `;
    });
    let tableBody = document.getElementById('tableBody');
    if(stokeObj.length != 0){
        tableBody.innerHTML = html;
    }
    else{
        tableBody.innerHTML = `No any books added in the library`;
    }
}

function deleteBook(index){
let stoke = localStorage.getItem("stoke");
let stokeObj;
if(stoke ==null){
    stokeObj = [];
}
else{
    stokeObj = JSON.parse(stoke);
}
stokeObj.splice(index, 1);
localStorage.setItem("stoke", JSON.stringify(stokeObj));
showlibrary();
}

function ResetLibrary(){
    localStorage.clear();
    showlibrary();
}

class Library{
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{//we have created these class for ease of using object of library class.
    addBookToStorage(book){
        let stoke = localStorage.getItem("stoke");
        let stokeObj;
        if(stoke == null){
            stokeObj = [];
        }
        else{
            stokeObj = JSON.parse(stoke);
        }
        stokeObj.push(book);
        localStorage.setItem("stoke", JSON.stringify(stokeObj));
        console.log(stokeObj);
        showlibrary();
    }
    /* implement the clear function */
    clear(){
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
        //these reset the value of input field.
    }
    /* implementing the validate function */
    validate(book){
        if(book.name.length < 2 || book.author.length < 2){
            return false;
         }else{
             return true;
         }
    }
    show(type, displaymessage){
        let message = document.getElementById('message');
        message.innerHTML = `        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                        <strong>Message!</strong> ${displaymessage}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                     </div>`;
        setTimeout(() => {
            message.innerHTML = ''
        }, 2000);//after 2 seconds we hide the meggage, so assigning empty string to the innerhTML of the element.
        //we are grabbing the element whose id is message, and adding the html element inside it.
    }
}

/* adding submit listener to the form, whose id is libraryForm */
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("library form submitted");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    /* grabbing bookname and author */
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    /* grabbing all three fiction, programming and cooking */
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Library(name, author, type);//book is an object of library class.
    console.log(book);

     let display = new Display();
     if(display.validate(book)){
         display.addBookToStorage(book);
         display.clear();
         display.show('success', " Your book hasbeen successfully added.");
     }
     else{
         display.show('danger', " sorry you cannot add these book.");
     }
     /* we validate the book object, if the validates() function returns true then, we add the book, clear the input section and show the message of show() function.
     else show another message.  */

    e.preventDefault();
    // the default behaviour of a form is, whenever it is submitted, it reloads the page. so we are preventing  the default behaviour of the form using e.preventDefaut() 

}