
class Book{
    title;
    author;
    release_date;
    constructor(title, author, release_date){
        this.title = title;
        this.author = author;
        this.release_date = release_date;
    }
}

$(document).ready(function(){
    $("#submitBook").submit(function(e){
        e.preventDefault();
        let title = $("#title").val();
        let author = $("#author").val();
        let releaseDate = $("#release_date").val();
        const book = new Book(title,author,releaseDate);
        console.log(book);
        postBook("http://localhost:3000/books/addbook", book)
        .then(data => {
            console.log(data)
            window.location.href = "books.html";
        });

    })
})

async function postBook(url, data){
    const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'  
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}