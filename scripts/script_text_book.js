//получение информации о содержимом страницы
const hasLoaded = sessionStorage.getItem('hasLoaded');
if(!hasLoaded){
    const data = localStorage.getItem('book');
    console.log("first load");
    if(data){
        const book = JSON.parse(data);
        loadContent(book);
    }
    sessionStorage.setItem('hasLoaded', data);
}
else{
    const prevdata = sessionStorage.getItem('hasLoaded');
    console.log("already load");
    if(prevdata){
        const book = JSON.parse(prevdata);
        loadContent(book);
    }
}
//загрузка содержимого страницы
function loadContent(book){
    const text = document.getElementById("text");
    text.src = "https://drive.google.com/file/d/1IFRbYrYcUqpd7-UI4-BVDuck12Psx8iq/preview";
    console.log("https://docs.google.com/gview?url="+book.text+"&embedded=true");
}