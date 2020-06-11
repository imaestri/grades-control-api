const express = require("express");
const router = express.Router();
const fs = require("fs");


router.post("/", (req, res) => {
    let grade = req.body;
    fs.readFile(global.fileName, "utf8", (err, data) =>{
        if(!err){
            try {
                let jsonData = JSON.parse(data);
                let time = new Date();
                let timestamp = time.toLocaleString();
                grade = {id: jsonData.nextId++,  ...grade, timestamp};
                jsonData.grades.push(grade);

                fs.writeFile(global.fileName, JSON.stringify(jsonData), (err) =>{
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


router.get("/:subject/:type", (req, res) =>{
    fs.readFile(global.fileName, "utf8", (err, data) => {
        if(!err){
            let jsonData = JSON.parse(data);
            const getSubject = jsonData.grades.filter((grade) =>{
                return grade.subject === req.params.subject && grade.type === req.params.type
            });
            const sizeArray = getSubject.length;
            const reduceSubject =  getSubject.reduce((accumulator, current) =>{
                return accumulator += current.value/sizeArray   
            },0);
           let getSubjectFormat = JSON.stringify({média: reduceSubject});
           if(getSubjectFormat){
               res.send(getSubjectFormat);
           }else{
               res.end();
           }
        }else{ 
            res.status(400).send({error: err.message});
        }
    });
});

router.get("/:subject/:type", (req, res) =>{
    fs.readFile(global.fileName, "utf8", (err, data) =>{
        if(!err){
            let jsonData = JSON.parse(data);
            const getSubject = jsonData.grades.filter((grade)=>{
                return grade.subject === req.params.subject && grade.type === req.params.type
            }).sort(function (a,b){
                return b.value - a.value; 
            }).slice(0,3);
            console.log(getSubject);
            let getSubjectFormat = JSON.stringify({top3: getSubject});
            if(getSubjectFormat){
                res.send(getSubjectFormat);
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
    let gradeUpdate = req.body;
    fs.readFile(global.fileName, "utf8", (err, data) => {
       if(!err){
         let jsonData = JSON.parse(data);
         let index = jsonData.grades.findIndex(grade => grade.id === gradeUpdate.id);
         jsonData.grades[index].student = gradeUpdate.student;
         jsonData.grades[index].subject = gradeUpdate.subject;
         jsonData.grades[index].type = gradeUpdate.type;
         jsonData.grades[index].value = gradeUpdate.value;
         
         fs.writeFile(global.fileName, JSON.stringify(jsonData), (err) =>{
            if(err){
                res.status(400).send({error: err.message});
            }else {
                res.end();
            };
        });
       }else{
        res.status(400).send({error: err.message});
       }
    });
});


router.delete("/:id", (req, res) => {
    fs.readFile(global.fileName, "utf8", (err, data) =>{
        if(!err){
            let jsonData = JSON.parse(data);
            const grade = jsonData.grades.filter(grade => grade.id !== parseInt(req.params.id, 10));
            jsonData.grades = grade;

            fs.writeFile(global.fileName, JSON.stringify(jsonData), (err) =>{
                if(err){
                    res.status(400).send({error: err.message});
                }else{
                    res.end();
                }
            });
        }else{
            res.status(400).send({error: err.message});
        }
    });
});

// exportando os endpoints
module.exports = router; 