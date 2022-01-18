const express = require('express');
const router = express.Router();
const movieDb = require('./movieDbConnector');


router.get("/listAllMovies", function(req, res){
    movieDb.query("select * from movies", function(err,results){
        res.send(results);
    })

})

router.get("/getMovie/:id", function(req, res){
    movieDb.query("select * from movies where id = " + req.params.id, function(err,results){
        res.send(results);
    })

})

router.post("/addMovie", function(req,res){
    movieDb.query(`insert into movies(title,director,release_date)values(?,?,?)`, [req.body.title,req.body.director,req.body.release_date]);
    res.send({status: "Movies successfully inserted"});
})

router.put("/updateMovie/:id", function(req,res){
    movieDb.query(
        'update movies set title = ?, director = ?, release_date = ? where id = ?',
        [req.body.title, req.body.director, req.body.release_date, req.params.id]);
        res.send(req.body);
})

router.delete("/deleteMovie/:id", function(req,res){
    movieDb.query(
        "delete from movies where id = ?", [req.params.id]
    );
    res.send({status: "movie successfully deleted"})
})

module.exports = router;