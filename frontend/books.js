
$(document).ready(function(){
    displayBooks();
    $("#editForm").submit(function(e){
        e.preventDefault();
        let Id = $("#bookId").val();
        let bookTitle = $("#title").val();
        let bookAuthor =$("#author").val();
        let bookRelease_date = $("#release_date").val();
        putBook(`http://localhost:3000/books/updatebook/${Id}`,{
            title: bookTitle, author: bookAuthor, release_date: bookRelease_date
        })
        .then(response => {
            console.log(response);
            displayBooks();
            $("#staticBackdrop").modal("hide");
        })
    })
    
})

function displayBooks(){
    const books = $("#books");
    books.empty();
    fetch("http://localhost:3000/books/listAllBooks")
    .then(response => response.json())
    .then(data =>{
        for(let i = 0; i < data.length; i++){
            books.append(
                `
                <div class="col-8 col-sm-8 col-md-6 col-lg-4 col-xl-4 mt-4">
                
                  <div class="card text-center" style="width: 18rem;">
                    <img src="https://i.pinimg.com/originals/b4/3d/43/b43d438638e2ed51d1f19dad2a4eb24d.gif" class="card-img-top w-100" height="220" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data[i].title}</h5>
                      <p class="card-text">${data[i].author}</p>
                      <p class="card-text">${data[i].release_date}</p>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getBookForEdit(${data[i].Id})">
                        <i class="fa fa-pencil"></i>
                        </button>
                      <a href="#" class="btn btn-danger" onclick="deleteBook(${data[i].Id})"><i class="fa fa-trash"></i></button></a>
                    </div>
                   
                  </div>
                `
               
            )
        }
        
    })
}
function getBookForEdit(id){
    let bookId = $("#bookId")
    let title = $("#title");
    let author = $("#author");
    let release_date = $("#release_date");

    fetch(`http://localhost:3000/books/getbook/${id}`)
    .then(response => response.json())
    .then(data => {
        bookId.val(data[0].Id);
        title.val(data[0].title);
        author.val(data[0].author);
        release_date.val(data[0].release_date)
    })
}

function deleteBook(id){
    fetch(`http://localhost:3000/books/deletebook/${id}`,{
        method: "DELETE"
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        displayBooks();
    });
}
async function putBook(url, data){
    const response = await fetch(url, {
        method: "PUT",
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