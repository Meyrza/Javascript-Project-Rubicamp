const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// pakai EJS buat render HTML
app.set("view engine", "ejs");

// biar bisa parsing data form
app.use(bodyParser.urlencoded({ extended: true }));

// hubungkan folder public (isi CSS, gambar, js client)
app.use(express.static(path.join(__dirname, "public")));

// lokasi file data
const dataFile = path.join(__dirname, "data.json");

// fungsi baca data dari JSON
function readData() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

// fungsi tulis data ke JSON
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// halaman utama
app.get("/", (req, res) => {
  const people = readData();
  res.render("index", { people });
});

// halaman tambah data
app.get("/add", (req, res) => {
  res.render("add");
});

// proses tambah data
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

// halaman edit data
app.get("/edit/:index", (req, res) => {
  const people = readData();
  const index = req.params.index;
  res.render("edit", { person: people[index], index });
});

// proses edit data
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

// hapus data
app.get("/delete/:index", (req, res) => {
  const people = readData();
  const index = req.params.index;
  people.splice(index, 1);
  writeData(people);
  res.redirect("/");
});

// jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
