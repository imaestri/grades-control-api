const express = require("express");
const router = express.Router();
const fs = require("fs").promises;


router.post("/", async (req, res) => {
    try {

        let grade = req.body;
        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        let time = new Date();
        let timestamp = time.toLocaleString();
       
        grade = { id: jsonData.nextId++, ...grade, timestamp };
        jsonData.grades.push(grade);

        await fs.writeFile(global.fileName, JSON.stringify(jsonData));
        res.end();

    } catch (error) {
        res.status(400).send({ erorr: error.message });
    }
});

router.get("/:student/:subject", async (req, res) => {
    try {

        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        
        const getStudent = jsonData.grades.filter((grade) => {
           grade.student === req.params.student && grade.subject === req.params.subject
        }).reduce((accumulator, current) => {
            return accumulator += current.value
        }, 0);
        
        let getStudentFormat = JSON.stringify({ total: getStudent });
        res.send(getStudentFormat);
        res.end();

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


router.get("/:subject/:type", async (req, res) => {
    try {

        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        
        const getSubject = jsonData.grades.filter((grade) => {
            return grade.subject === req.params.subject && grade.type === req.params.type
        });
        const sizeArray = getSubject.length;
        const reduceSubject = getSubject.reduce((accumulator, current) => {
            return accumulator += current.value / sizeArray
        }, 0);
        let getSubjectFormat = JSON.stringify({ média: reduceSubject });
        
        res.send(getSubjectFormat);
        res.end();

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get("/:subject/:type", async (req, res) => {
    try {

        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        
        const getSubject = jsonData.grades.filter((grade) => {
            return grade.subject === req.params.subject && grade.type === req.params.type
        }).sort(function (a, b) {
            return b.value - a.value;
        }).slice(0, 3);
        
        let getSubjectFormat = JSON.stringify({ top3: getSubject });
        res.send(getSubjectFormat);
        res.end();

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {

        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        const grade = jsonData.grades.find(grade => grade.id === parseInt(req.params.id, 10));
        
        res.send(grade);
        res.end();
        
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});



router.put("/", async (req, res) => {
    try {
       
        let gradeUpdate = req.body;
        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        let index = jsonData.grades.findIndex(grade => grade.id === gradeUpdate.id);
        
        jsonData.grades[index] = gradeUpdate;

        await fs.writeFile(global.fileName, JSON.stringify(jsonData));
        res.end();
    
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});



router.delete("/:id", async (req, res) => {
    try {
    
        let data = await fs.readFile(global.fileName, "utf8");
        let jsonData = JSON.parse(data);
        const grade = jsonData.grades.filter(grade => grade.id !== parseInt(req.params.id, 10));
        
        jsonData.grades = grade;

        await fs.writeFile(global.fileName, JSON.stringify(jsonData));
        res.end();
    
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// exportando os endpoints
module.exports = router; 