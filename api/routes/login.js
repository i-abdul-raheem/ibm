const { User, Employee } = require("../models/model");
const jwt = require("jsonwebtoken");
const route = require("express").Router();
const nodemailer = require("nodemailer");

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

const generatePassword = () => {
  let length = 8;
  let chars = "1234567890qwertyuioasdfghjklzxcvbnm!@#$%^&*(";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

route.post("/", async (req, res) => {
  let { employeeId, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ employeeId: employeeId });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return setResponse(405, error, null, res);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return setResponse(405, error, null, res);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, employeeId: existingUser.employeeId },
      "arhexlabs",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return setResponse(405, error, null, res);
  }
  return setResponse(200, "Login Successfull", token, res);
});

route.post("/reset", async (req, res) => {
  const { employeeId } = req.body;
  const userExist = await User.findOne({ employeeId: employeeId });
  if (!userExist) {
    return setResponse(404, "User not found", null, res);
  }
  const employeeExist = await Employee.findOne({ cnic: employeeId });
  if (!employeeExist) {
    return setResponse(404, "User not found", null, res);
  }
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "f2018266275@umt.edu.pk",
      pass: "7Zh8@Thr",
    },
  });
  let password = generatePassword();
  let msg = `Employee ID: ${employeeId}\nPassword: ${password}`;
  let mailDetails = {
    from: process.env.REACT_APP_EMAIL,
    to: employeeExist.email,
    subject: "IBM - Account Activation",
    text: msg,
  };
  await User.updateOne({employeeId: employeeId}, {$set: {password: password}});
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      return setResponse(405, "Some error occured", err, res);
    } else {
      return setResponse(200, "New password set to email", null, res);
    }
  });
});

module.exports = route;
