const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {

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