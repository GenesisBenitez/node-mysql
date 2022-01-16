$(document).ready(function(){

    displayMovies();
})
function displayMovies(){
    const movies = $("#movies");
    fetch("http://localhost:3000/movies/listAllMovies")
    .then(response => response.json())
    .then(data =>{
        for(let i = 0; i < data.length; i++){
            movies.append(
                `
                <div class="col-8 col-sm-8 col-md-6 col-lg-4 col-xl-4 mt-4">
                
                <div class="card text-center" style="width: 18rem;">
                  <img src="https://i.pinimg.com/originals/43/3d/83/433d83f7e481f35245f8c6bb7c7591d8.gif" class="card-img-top w-100" height="220" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].director}</p>
                    <p class="card-text">${data[i].release_date}</p>
                    <a href="#" class="btn btn-danger" onclick="deleteMovie(${data[i].Id})"><i class="fa fa-trash"></i> Delete Movie</button></a>
                  </div>
                 
                </div>
                `
                
            )
        }
        
    })
}