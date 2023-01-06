const route = require("express").Router();
const { User, Employee } = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;
const nodemailer = require("nodemailer");

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

const isNumeric = (val) => {
  return !isNaN(val);
};

const generatePassword = () => {
  let length = 8;
  let chars = "1234567890qwertyuioasdfghjklzxcvbnm!@#$%^&*(";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const isAlphabat = (val) => {
  return isNaN(val);
};

const isSymbol = (val) => {
  const ascii = val.charCodeAt(0);
  if (ascii < 48 || ascii > 122) {
    return true;
  }
  if (ascii > 57 && ascii < 65) {
    return true;
  }
  if (ascii > 90 && ascii < 97) {
    return true;
  }
  return false;
};

const iterateWithFunction = (data, func) => {
  return data.split("").some((i) => {
    return func(i);
  });
};

route.post("/activate", async (req, res) => {
  const data = req.body;
  if (!data.employeeId) {
    return setResponse(405, "Employee ID is required", null, res);
  }
  const employee = await Employee.findOne({ cnic: data.employeeId });
  const userFound = await User.findOne({ employeeId: data.employeeId });
  if (userFound) {
    const updated = await User.updateOne(
      { employeeId: data.employeeId },
      { $set: { status: true } }
    );
    return setResponse(202, "Account Activated", updated, res);
  }
  if (!employee) {
    return setResponse(404, "Employee not foud", null, res);
  }
  if (!employee.email || employee.email == "") {
    return setResponse(405, "Add Employee Email Address", null, res);
  }
  if (iterateWithFunction(data.employeeId, isAlphabat)) {
    return setResponse(
      405,
      "CNIC can not contain alphabat or symbol",
      null,
      res
    );
  }
  if (iterateWithFunction(data.employeeId, isSymbol)) {
    return setResponse(405, "CNIC can not contain symbol", null, res);
  }
  if (
    data.employeeId.split("").length < 13 ||
    data.employeeId.split("").length > 13
  ) {
    return setResponse(405, "CNIC length should be 13", null, res);
  }
  const email = employee.email;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "f2018266275@umt.edu.pk",
      pass: "7Zh8@Thr",
    },
  });
  let password = generatePassword();
  let msg = `Employee ID: ${employee.cnic}\nPassword: ${password}`;
  let mailDetails = {
    from: process.env.REACT_APP_EMAIL,
    to: email,
    subject: "IBM - Account Activation",
    text: msg,
  };
  const user = new User({
    employeeId: employee.cnic,
    password: password,
    access: ["admin"],
  });
  await user.save();
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      return setResponse(405, "Some error occured", err, res);
    } else {
      return setResponse(200, "User Activated", null, res);
    }
  });
});

route.post("/deactivate", async (req, res) => {
  const data = req.body;
  if (!data.employeeId) {
    return setResponse(405, "Employee id is required", null, res);
  }
  const employee = await User.findOne({ employeeId: data.employeeId });
  if (!employee) {
    return setResponse(404, "Employee not found", null, res);
  }
  const updated = await User.updateOne(
    { employeeId: data.employeeId },
    { $set: { status: false } }
  );
  return setResponse(202, "Employee deactivated", updated, res);
});

route.put("/", async (req, res) => {
  const data = req.body;
  if (!data.employeeId) {
    return setResponse(405, "Employee id is required", null, res);
  }
  if (!data.access) {
    return setResponse(405, "Access is required", null, res);
  }
  if (typeof data.access != "object") {
    return setResponse(404, "Invalid Format", null, res);
  }
  const updated = await User.updateOne(
    { employeeId: data.employeeId },
    { $set: { access: data.access } }
  );
  return setResponse(202, "Employee access updated", updated, res);
});

module.exports = route;
