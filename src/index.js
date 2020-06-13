const express = require("express");
const app = express();
const fs = require("fs").promises;
const winston = require("winston");

const gradesRouter = require("../routes/routes.js");

global.fileName = "../files/grades.json";

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) =>{
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: "grades-control-api.log"})
  ],
  format: combine(
    label({label: "grades-control-api"}),
    timestamp(),
    myFormat
  )
});

app.use(express.json());
app.use("/grades", gradesRouter);


app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, "utf8");
    logger.info("API Started!");
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