$(document).ready(function(){
    displayMovies();
    $("#editForm").submit(function(e){
        e.preventDefault();
        let Id = $("#movieId").val();
        let movieTitle = $("#title").val();
        let movieDirector =$("#director").val();
        let movieRelease_date = $("#release_date").val();
        putMovie(`http://localhost:3000/movies/updatemovie/${Id}`,{
            title: movieTitle, director: movieDirector, release_date: movieRelease_date
        })
        .then(response => {
            console.log(response);
            displayMovies();
            $("#staticBackdrop").modal("hide");
        })
    })
})
function displayMovies(){
    const movies = $("#movies");
    movies.empty();
    fetch("http://localhost:3000/movies/listallmovies")
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getMovieForEdit(${data[i].Id})">
                        <i class="fa fa-pencil"></i>
                        </button>
                    <button class="btn btn-danger" onclick="deleteMovie(${data[i].Id})"><i class="fa fa-trash"></i></button>
                  </div>
                 
                </div>
                `
                
            )
        }
        
    })

}