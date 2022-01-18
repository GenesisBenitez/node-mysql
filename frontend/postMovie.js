class Movie{
    title;
    director;
    release_date;
    constructor(title, director, release_date){
        this.title = title;
        this.director = director;
        this.release_date = release_date;
    }
}

$(document).ready(function(){
    $("#submitMovie").submit(function(e){
        e.preventDefault();
        let title = $("#title").val();
        let director = $("#director").val();
        let releaseDate = $("#release_date").val();
        const movie = new Movie(title,director,releaseDate);
        console.log(movie);
        postMovie("http://localhost:3000/movies/addmovie", movie)
        .then(data => {
            console.log(data)
            window.location.href = "movies.html";
        });
    })
})
async function postMovie(url, data){
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