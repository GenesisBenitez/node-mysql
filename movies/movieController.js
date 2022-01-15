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

module.exports = router;