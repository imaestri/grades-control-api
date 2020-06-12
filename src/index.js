const express = require("express");
const app = express();
const fs = require("fs");
const gradesRouter = require("../routes/routes.js");

global.fileName = "../files/grades.json";

app.use(express.json());
app.use("/grades", gradesRouter);

app.listen(3000, function () {
  try {
    fs.readFile(global.fileName, "utf8", (error, data) => {
      if (error) {
        const initialJson = {
          nextId: 1,
          grades: [],
        };
        fs.writeFile(global.fileName, JSON.stringify(initialJson), (error) => {
          if (error) {
          }
        });
      }
    });
  } catch (error) {}

  console.log("Api Started!");
});
