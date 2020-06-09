const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
    let grade = req.body;
    fs.readFile(global.fileName, "utf8", (err, data) =>{
        if(!err){
            try {
                let json = JSON.parse(data);
                let time = new Date();
                let timestamp = time.toLocaleString();
                grade = {id: json.nextId++,  ...grade, timestamp};
                json.grades.push(grade);

                fs.writeFile(global.fileName, JSON.stringify(json), (err) =>{
                    if(err){
                        console.log(err);
                    }else {
                        res.end();
                    };
                });
            } catch (err) {
                res.status(400).send({erorr: err.message});
            };   
        }else{
            res.status(400).send({erorr: err.message});
        };
    });
});

router.get("/", (req, res) => {
    res.send("ok");
});

router.get("/:id", (req, res)=> {

});

router.put("/", (req, res)=>{

});

router.put("/:id", (req, res)=>{

});

router.delete("/", (req, res) => {

});

router.delete("/:id", (req, res) => {

});

// exportando os endpoints
module.exports = router; 