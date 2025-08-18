const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const dataFile = path.join(__dirname, "data.json");

function readData() {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  const people = readData();
  res.render("index", { people });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const people = readData();
  const newData = {
    name: req.body.name,
    height: parseInt(req.body.height),
    weight: parseFloat(req.body.weight),
    birthdate: req.body.birthdate,
    married: req.body.married === "true"
  };
  people.push(newData);
  writeData(people);
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const people = readData();
  const index = req.params.index;
  res.render("edit", { person: people[index], index });
});

app.post("/edit/:index", (req, res) => {
  const people = readData();
  const index = req.params.index;
  people[index] = {
    name: req.body.name,
    height: parseInt(req.body.height),
    weight: parseFloat(req.body.weight),
    birthdate: req.body.birthdate,
    married: req.body.married === "true"
  };
  writeData(people);
  res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
  const people = readData();
  const index = req.params.index;
  people.splice(index, 1);
  writeData(people);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
