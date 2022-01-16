$(document).ready(function(){
    displayBooks();
    
})

function displayBooks(){
    const books = $("#books");
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
                      <a href="#" class="btn btn-danger" onclick="deleteBook(${data[i].Id})"><i class="fa fa-trash"></i> Delete Book</button></a>
                    </div>
                   
                  </div>
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