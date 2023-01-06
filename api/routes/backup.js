const route = require("express").Router();
const fs = require("fs");
const {
  Department,
  RawMaterial,
  Product,
  Account,
  Employee,
  Expense,
  Attendance,
  Capital,
  Salary,
  Purchase,
  Sale,
  Production,
} = require("../models/model");

route.get("/create", async (req, res) => {
  const collections = [
    Department,
    RawMaterial,
    Product,
    Account,
    Employee,
    Expense,
    Attendance,
    Capital,
    Salary,
    Purchase,
    Sale,
    Production,
  ];
  const names = [
    "Department",
    "RawMaterial",
    "Product",
    "Account",
    "Employee",
    "Expense",
    "Attendance",
    "Capital",
    "Salary",
    "Purchase",
    "Sale",
    "Production",
  ];
  const myBackup = {};
  for (let i = 0; i < collections.length; i++) {
    myBackup[names[i]] = await collections[i].find({});
  }
  var createStream = fs.createWriteStream("backup.json");
  createStream.end();
  var writeStream = fs.createWriteStream("backup.json");
  writeStream.write(JSON.stringify(myBackup));
  writeStream.end();
  res.download("backup.json");
  fs.unlinkSync("backup.json");
});

// route.get("/restore", async (req, res) => {
//   const collections = [
//     Department,
//     RawMaterial,
//     Product,
//     Account,
//     Employee,
//     Expense,
//     Attendance,
//     Capital,
//     Salary,
//     Purchase,
//     Sale,
//     Production,
//   ];
//   const names = [
//     "Department",
//     "RawMaterial",
//     "Product",
//     "Account",
//     "Employee",
//     "Expense",
//     "Attendance",
//     "Capital",
//     "Salary",
//     "Purchase",
//     "Sale",
//     "Production",
//   ];
//   for (let i = 0; i < collections.length; i++) {
//     await collections[i].deleteMany({});
//   }
//     return res.status(400).send(req.body);
// });

module.exports = route;
