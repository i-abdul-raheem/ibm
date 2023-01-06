const route = require("express").Router();
const departments = require("./departments");
const products = require("./products");
const rawMaterials = require("./rawMaterials");
const accounts = require("./accounts");
const employees = require("./employees");
const expenses = require("./expenses");
const attendance = require("./attendance");
const capitals = require("./capitals");
const salary = require("./salary");
const purchases = require("./purchases");
const sales = require("./sales");
const inventory = require("./inventory");
const productions = require("./productions");
const finishedgoods = require("./finishedgoods");
const payments = require("./payments");
const backup = require("./backup");
const users = require("./users");
const login = require("./login");
const auth = require("../middlewares/authenticate");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://arhex:hEllfun0300@arhex.arsz5at.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

route.use("/departments", auth, departments);
route.use("/products", auth, products);
route.use("/rawMaterials", auth, rawMaterials);
route.use("/accounts", auth, accounts);
route.use("/employees", auth, employees);
route.use("/expenses", auth, expenses);
route.use("/attendance", auth, attendance);
route.use("/capitals", auth, capitals);
route.use("/salary", auth, salary);
route.use("/purchases", auth, purchases);
route.use("/sales", auth, sales);
route.use("/backup", auth, backup);
route.use("/payments", auth, payments);
route.use("/finishedgoods", auth, finishedgoods);
route.use("/productions", auth, productions);
route.use("/inventory", auth, inventory);
route.use("/users", auth, users);
route.use("/login", login);

module.exports = route;
