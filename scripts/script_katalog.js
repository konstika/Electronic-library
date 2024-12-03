var books = document.getElementById('books');
const select_mark = document.getElementById("select_mark");
const search = document.getElementById('search');
createBooks();

/*Обработка выбора меток*/
select_mark.addEventListener('change',function(){
    clearBooks();
    createBooks();
});
/*Обработка поисковой строки*/
search.addEventListener('keydown',function(event){
    if(event.key == "Enter"){
        clearBooks();
        createBooks();
    }
});
/*Создание списка книг для показа*/
function createBooks(){
    var class_books = data_katalog
    if(select_mark.value=="not_mark"){
        class_books = data_katalog.filter(book => 
            (book["read"]==false && book["readed"]==false && book["plan"]==false));
    }
    else if(select_mark.value!="all"){class_books = data_katalog.filter(book => book[select_mark.value]==true);}
    var list_books = class_books;
    if(search.value!==""){
        list_books = class_books.filter(book => ((book.title).toLowerCase()).includes((search.value).toLowerCase()) 
        || ((book.author).toLowerCase()).includes((search.value).toLowerCase()));
    }
    list_books.forEach(book => {
        createBook(book);
    });
}


//создание элемента книги
function createBook(book){
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book not_mark';
    const img = document.createElement('img');
    img.src = book.image; 
    img.alt = book.title; 

    const interfaceBookDiv = document.createElement('div');
    interfaceBookDiv.className = 'interface_book';

    const buttonRead = document.createElement('button');
    buttonRead.className = 'button_book button_read';
    buttonRead.textContent = 'Читаю';
    if(book.read == true){
        buttonRead.style.backgroundColor = "coral";
    }

    const buttonReaded = document.createElement('button');
    buttonReaded.className = 'button_book button_readed';
    buttonReaded.textContent = 'Прочитано';
    if(book.readed == true){
        buttonReaded.style.backgroundColor = "coral";
    }

    const buttonPlan = document.createElement('button');
    buttonPlan.className = 'button_book button_plan';
    buttonPlan.textContent = 'В планах';
    if(book.plan == true){
        buttonPlan.style.backgroundColor = "coral";
    }

    const buttonMore = document.createElement('a');
    buttonMore.className = 'button_book button_more';
    buttonMore.href = 'book.html';
    buttonMore.textContent = 'Подробнее';

    const buttonToRead = document.createElement('a');
    buttonToRead.className = 'button_book button_to_read';
    buttonToRead.href = 'text_book.html';
    buttonToRead.textContent = 'Читать';
 
    interfaceBookDiv.appendChild(buttonRead);
    interfaceBookDiv.appendChild(buttonReaded);
    interfaceBookDiv.appendChild(buttonPlan);
    interfaceBookDiv.appendChild(buttonMore);
    interfaceBookDiv.appendChild(buttonToRead);

    bookDiv.appendChild(img);
    bookDiv.appendChild(interfaceBookDiv);

    const booksContainer = document.getElementById('books');
    booksContainer.appendChild(bookDiv);

    book.element = bookDiv;
}

function deleteBook(bookDiv){
    bookDiv.remove();
}
function clearBooks(){
    const clear_books = document.getElementsByClassName('book');
    const len = clear_books.length;
    for(var i=0; i<len; i++){deleteBook(clear_books[0]);}
}


//обработка нажатия кнопок
books.addEventListener('click', clickButton);
books.addEventListener('contextmenu', clickLinks);
function clickButton(event){
    if(event.target.closest('BUTTON')){
        const but = event.target.closest('BUTTON');
        const book_int = event.target.closest('DIV');
        const book = book_int.parentElement;
        const book_json = data_katalog.find(bookjs => bookjs.element===book);

        book_int.getElementsByClassName("button_read")[0].style.backgroundColor="rgba(0, 0, 0, 0)";
        book_int.getElementsByClassName("button_readed")[0].style.backgroundColor="rgba(0, 0, 0, 0)";
        book_int.getElementsByClassName("button_plan")[0].style.backgroundColor="rgba(0, 0, 0, 0)";

        if(but.classList.contains("button_read")){
            if(book_json.read==false){
                but.style.backgroundColor = "coral";
                book_json.read = true;
                book_json.readed = false;
                book_json.plan = false;
            }else{
                book_json.read = false;
            }
        }
        else if(but.classList.contains("button_readed")){
            if(book_json.readed==false){
                but.style.backgroundColor = "coral";
                book_json.readed = true;
                book_json.read = false;
                book_json.plan = false;
            }else{
                book_json.readed = false;
            }
        }
        else if(but.classList.contains("button_plan")){
            if(book_json.plan==false){
                but.style.backgroundColor = "coral";
                book_json.plan = true;
                book_json.read = false;
                book_json.readed = false;
            }else{
                book_json.plan = false;
            }
        }
        if((select_mark.value=="read" && book_json.read == false) || 
        (select_mark.value=="readed" && book_json.readed == false) ||
        (select_mark.value=="plan" && book_json.plan == false) || 
        (select_mark.value=="not_mark" && 
        (book_json.read == true || book_json.readed == true || book_json.plan == true ))){
                deleteBook(book);
        }
    }
    else if(event.target.closest('A')){
        clickLinks(event);
    }
}
function clickLinks(event){
    if(event.target.closest('A')){
        const data = data_katalog.find(book => book.element===((event.target.closest('DIV')).parentElement));
        localStorage.setItem('book', JSON.stringify(data));
        sessionStorage.setItem('hasLoaded', JSON.stringify(data));
    }
}

