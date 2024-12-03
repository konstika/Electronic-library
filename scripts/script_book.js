//получение информации о содержимом страницы
const hasLoaded = sessionStorage.getItem('hasLoaded');
var book;
if(!hasLoaded){
    data = localStorage.getItem('book');
    if(data){
        const book = JSON.parse(data);
        loadContent(book);
    }
    sessionStorage.setItem('hasLoaded', data);
}
else{
    const prevdata = sessionStorage.getItem('hasLoaded');
    if(prevdata){
        book = JSON.parse(prevdata);
        loadContent(book);
    }
}
//загрузка содержимого страницы
function loadContent(book){
    const title = document.getElementById("title");
    title.textContent = book.title;
    const author = document.getElementById("author");
    author.textContent = book.author;
    const img = document.getElementById("book_image");
    img.src = book.image;
    const annotation = document.getElementById("annotation");
    annotation.textContent = book.annotation;
}

const link = document.getElementById('button_to_read_this_book');
link.addEventListener('click',clickLinks);
link.addEventListener('contextmenu',clickLinks);
function clickLinks(event){
    if(event.target.closest('A')){
        localStorage.setItem('book', JSON.stringify(book));
    }
}