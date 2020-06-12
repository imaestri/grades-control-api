const express = require("express");
const app = express();
const fs = require("fs").promises;
const gradesRouter = require("../routes/routes.js");

global.fileName = "../files/grades.json";

app.use(express.json());
app.use("/grades", gradesRouter);


app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, "utf8");
    console.log("API Started!");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch(error => {
      console.log(error);
    });
  }
});