const express = require('express');
const router = express.Router();
const bookdb = require('./bookDbConnector');


router.get("/listAllbooks", function(req, res){
    bookdb.query("select * from books", function(err,results){
        res.send(results);
    })

})

router.get("/getBook/:id", function(req, res){
    bookdb.query("select * from books where id = " + req.params.id, function(err,results){
        res.send(results);
    })

})

module.exports = router;