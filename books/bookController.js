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
router.post("/addBook", function(req,res){
    bookdb.query(`insert into books(title,author,release_date)values(?,?,?)`, [`${req.body.title}`,`${req.body.author}`,`${req.body.release_date}`]);
    res.send({status: "Books successfully instered"});
})
router.put("/updateBook/:id", function(req,res){
    bookdb.query(
        'update books set title = ?, author = ?, release_date = ? where id = ?',
        [`${req.body.title}`, `${req.body.author}`, `${req.body.release_date}`, `${req.params.id}`]);
        res.send(req.body);
})

router.delete("/deleteBook/:id", function(req,res){
    bookdb.query(
    "delete from books where id = ?", [req.params.id]
    );
    res.send({status: "book successfully deleted"});
})


module.exports = router;