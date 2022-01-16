$(document).ready(function(){
    displayBooks();
    displayMovies();
})

function displayBooks(){
    const books = $("#books");
    fetch("http://localhost:3000/books/listAllBooks")
    .then(response => response.json())
    .then(data =>{
        for(let i = 0; i < data.length; i++){
            books.append(
                `
                <tr>
      <th scope="row">${data[i].Id}</th>
      <td>${data[i].title}</td>
      <td>${data[i].author}</td>
      <td>${data[i].release_date}</td>
      <td><button class="btn btn-light" onclick="deleteBook(${data[i].Id})"><i class="fa fa-trash"></i></button></td>
    </tr>
                `
            )
        }
        
    })
}
function displayMovies(){
    const movies = $("#movies");
    fetch("http://localhost:3000/movies/listAllMovies")
    .then(response => response.json())
    .then(data =>{
        for(let i = 0; i < data.length; i++){
            movies.append(
                `
                <tr>
      <th scope="row">${data[i].Id}</th>
      <td>${data[i].title}</td>
      <td>${data[i].director}</td>
      <td>${data[i].release_date}</td>
    </tr>
                `
            )
        }
        
    })

}
function deleteBook(id){
    fetch(`http://localhost:3000/books/deletebook/${id}`,{
        method: "DELETE"
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.reload();
    });
}