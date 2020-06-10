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

router.get("/:student/:subject", (req, res) => {
   fs.readFile(global.fileName, "utf8", (err, data) => {
    if(!err){
        let jsonData  = JSON.parse(data);
        const getStudent = jsonData.grades.filter(grade => grade.student === req.params.student && grade.subject === req.params.subject)
        .reduce((accumulator, current) => {
            return accumulator += current.value
        }, 0);
        let getStudentFormat  = JSON.stringify({total: getStudent});
        if(getStudentFormat){
            res.send(getStudentFormat);
        }else{
            res.end();
        }
    }else{
        res.status(400).send({error: err.message});
    }
   });
});


router.get("/:id", (req, res)=> {
    fs.readFile(global.fileName, "utf8", (err, data) =>{
        if(!err){
            let jsonData = JSON.parse(data);
            const grade = jsonData.grades.find(grade => grade.id === parseInt(req.params.id, 10));
        if(grade){
            res.send(grade);
        }else{
            res.end();
        }
        }else{
            res.status(400).send({error: err.message});
        }
    });
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