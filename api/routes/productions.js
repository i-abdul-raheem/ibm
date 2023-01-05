const route = require("express").Router();
const {
  Production,
  Product,
  RawMaterial,
  Purchase,
} = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

// Get all productions
route.get("/", async (req, res) => {
  const productions = await Production.find({});
  return setResponse(200, null, productions, res);
});

// Get single production
route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const production = await Production.findOne({ _id: ObjectId(req.params.id) });
  if (!production) {
    return setResponse(404, "Production record not found", null, res);
  }
  return setResponse(200, null, production, res);
});

// Start new production
route.post("/", async (req, res) => {
  const data = req.body;
  if (!data.product) {
    return setResponse(405, "Product is required", null, res);
  }
  if (!ObjectId.isValid(data.product)) {
    return setResponse(405, "Invalid product id", null, res);
  }
  const productExist = await Product.findOne({ _id: ObjectId(data.product) });
  if (!productExist) {
    return setResponse(405, "Product not exist", null, res);
  }
  if (!data.quantity) {
    return setResponse(405, "Quantity is required", null, res);
  }
  if (isNaN(data.quantity)) {
    return setResponse(
      405,
      "Quantity can not contain alphabat or symbol",
      null,
      res
    );
  }
  if (parseInt(data.quantity) < 1) {
    return setResponse(405, "Product quantity should be 1 or more", null, res);
  }
  if (!data.rawMaterial || data.rawMaterial.length < 1) {
    return setResponse(405, "Raw material is required", null, res);
  }
  if (typeof data.rawMaterial != "object") {
    return setResponse(
      405,
      "Invalid list of raw material provided",
      data.rawMaterial,
      res
    );
  }
  for (let i = 0; i < data.rawMaterial.length; i++) {
    if (!data.rawMaterial[i].id) {
      return setResponse(405, "Raw material id is required", null, res);
    }
    if (!ObjectId.isValid(data.rawMaterial[i].id)) {
      return setResponse(405, "Invalid raw material id", null, res);
    }
    const materialExist = await RawMaterial.findOne({
      _id: ObjectId(data.rawMaterial[i].id),
    });
    if (!materialExist) {
      return setResponse(405, "Raw material does not exist", null, res);
    }
    if (!data.rawMaterial[i].quantity) {
      return setResponse(405, "Raw material quantity is required", null, res);
    }
    if (isNaN(data.rawMaterial[i].quantity)) {
      return setResponse(
        405,
        "Raw Material quantity should be a number",
        null,
        res
      );
    }
    if (data.rawMaterial[i].quantity < 1) {
      return setResponse(
        405,
        "Raw material quantity should be 1 or more",
        null,
        res
      );
    }
    const rawMaterial = await RawMaterial.find({});
    const purchases = await Purchase.find({});
    const prods = await Production.find({});
    const myObj = {};
    const myInv = {};
    for (let material = 0; material < rawMaterial.length; material++) {
      myObj[rawMaterial[material]._id] = [0];
      myInv[rawMaterial[material]._id] = [0];
      for (let purchase = 0; purchase < purchases.length; purchase++) {
        for (let j = 0; j < purchases[purchase]["rawMaterial"].length; j++) {
          if (
            purchases[purchase]["rawMaterial"][j]["material"] ==
            rawMaterial[material]._id
          ) {
            myObj[rawMaterial[material]._id].push(
              parseInt(purchases[purchase]["rawMaterial"][j]["quantity"])
            );
          }
        }
        for (let j = 0; j < purchases[purchase]["returns"].length; j++) {
          if (
            purchases[purchase]["returns"][j]["material"] ==
            rawMaterial[material]._id
          ) {
            myObj[rawMaterial[material]._id].push(
              0 - parseInt(purchases[purchase]["returns"][j]["quantity"])
            );
          }
        }
      }
      for (let prod = 0; prod < prods.length; prod++) {
        for (let j = 0; j < prods[prod]["rawMaterial"].length; j++) {
          if (
            prods[prod]["rawMaterial"][j]["id"] == rawMaterial[material]._id
          ) {
            myInv[rawMaterial[material]._id].push(
              parseInt(0 - prods[prod]["rawMaterial"][j]["quantity"])
            );
          }
        }
      }
      let sum = 0;
      for (let j = 0; j < myObj[rawMaterial[material]._id].length; j++) {
        sum += myObj[rawMaterial[material]._id][j];
      }
      for (let j = 0; j < myInv[rawMaterial[material]._id].length; j++) {
        sum += myInv[rawMaterial[material]._id][j];
      }
      myObj[rawMaterial[material]._id] = sum;
    }
    const myInventory = myObj[data.rawMaterial[i].id];
    if (data.rawMaterial[i].quantity > myInventory) {
      return setResponse(
        405,
        "Not enough Raw material in inventory",
        null,
        res
      );
    }
  }
  if (data.expense && data.expense.length > 0) {
    for (let i = 0; i < data.expense.length; i++) {
      if (!data.expense[i].title) {
        return setResponse(405, "Expense Title is required", null, res);
      }
      if (!data.expense[i].cost) {
        return setResponse(405, "Expense Cost is required", null, res);
      }
      if (isNaN(data.expense[i].cost)) {
        return setResponse(405, "Expense cost should be a number", null, res);
      }
    }
  }
  data.status = "new";
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const now = `${month}/${day}/${year}`;
  data.date = now;
  const count = await Production.find({});
  data.pid = count.length + 1;
  const newProduction = new Production(data);
  newProduction.save();
  return setResponse(
    201,
    "Start Production Request Initiated",
    newProduction,
    res
  );
});

// Update production
route.put("/:id", async (req, res) => {
  const data = req.body;
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const productExist = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!productExist) {
    return setResponse(404, "Production not exist", null, res);
  }
  if (!data.rawMaterial || data.rawMaterial.length < 1) {
    return setResponse(405, "Raw material is required", null, res);
  }
  if (typeof data.rawMaterial != "object") {
    return setResponse(
      405,
      "Invalid list of raw material provided",
      data.rawMaterial,
      res
    );
  }
  for (let i = 0; i < data.rawMaterial.length; i++) {
    if (!data.rawMaterial[i].id) {
      return setResponse(405, "Raw material id is required", null, res);
    }
    if (!ObjectId.isValid(data.rawMaterial[i].id)) {
      return setResponse(405, "Invalid raw material id", null, res);
    }
    const materialExist = await RawMaterial.findOne({
      _id: ObjectId(data.rawMaterial[i].id),
    });
    if (!materialExist) {
      return setResponse(405, "Raw material does not exist", null, res);
    }
    if (!data.rawMaterial[i].quantity) {
      return setResponse(405, "Raw material quantity is required", null, res);
    }
    if (isNaN(data.rawMaterial[i].quantity)) {
      return setResponse(
        405,
        "Raw Material quantity should be a number",
        null,
        res
      );
    }
    if (data.rawMaterial[i].quantity < 1) {
      return setResponse(
        405,
        "Raw material quantity should be 1 or more",
        null,
        res
      );
    }
    const rawMaterial = await RawMaterial.find({});
    const purchases = await Purchase.find({});
    const prods = await Production.find({
      _id: { $ne: ObjectId(req.params.id) },
    });
    const myObj = {};
    const myInv = {};
    for (let material = 0; material < rawMaterial.length; material++) {
      myObj[rawMaterial[material]._id] = [0];
      myInv[rawMaterial[material]._id] = [0];
      for (let purchase = 0; purchase < purchases.length; purchase++) {
        for (let j = 0; j < purchases[purchase]["rawMaterial"].length; j++) {
          if (
            purchases[purchase]["rawMaterial"][j]["material"] ==
            rawMaterial[material]._id
          ) {
            myObj[rawMaterial[material]._id].push(
              parseInt(purchases[purchase]["rawMaterial"][j]["quantity"])
            );
          }
        }
        for (let j = 0; j < purchases[purchase]["returns"].length; j++) {
          if (
            purchases[purchase]["returns"][j]["material"] ==
            rawMaterial[material]._id
          ) {
            myObj[rawMaterial[material]._id].push(
              0 - parseInt(purchases[purchase]["returns"][j]["quantity"])
            );
          }
        }
      }
      for (let prod = 0; prod < prods.length; prod++) {
        for (let j = 0; j < prods[prod]["rawMaterial"].length; j++) {
          if (
            prods[prod]["rawMaterial"][j]["id"] == rawMaterial[material]._id
          ) {
            myInv[rawMaterial[material]._id].push(
              parseInt(0 - prods[prod]["rawMaterial"][j]["quantity"])
            );
          }
        }
      }
      let sum = 0;
      for (let j = 0; j < myObj[rawMaterial[material]._id].length; j++) {
        sum += myObj[rawMaterial[material]._id][j];
      }
      for (let j = 0; j < myInv[rawMaterial[material]._id].length; j++) {
        sum += myInv[rawMaterial[material]._id][j];
      }
      myObj[rawMaterial[material]._id] = sum;
    }
    const myInventory = myObj[data.rawMaterial[i].id];
    if (data.rawMaterial[i].quantity > myInventory) {
      return setResponse(
        405,
        "Not enough Raw material in inventory",
        null,
        res
      );
    }
  }
  if (data.expense && data.expense.length > 0) {
    for (let i = 0; i < data.expense.length; i++) {
      if (!data.expense[i].title) {
        return setResponse(405, "Expense Title is required", null, res);
      }
      if (!data.expense[i].cost) {
        return setResponse(405, "Expense Cost is required", null, res);
      }
      if (isNaN(data.expense[i].cost)) {
        return setResponse(405, "Expense cost should be a number", null, res);
      }
    }
  }
  data.status = "update";
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const now = `${month}/${day}/${year}`;
  data.date = now;
  data.updateDataRequest = {
    rawMaterial: data.rawMaterial,
    expense: data.expense,
  };
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: {
        status: data.status,
        date: data.date,
        updateDataRequest: data.updateDataRequest,
      },
    }
  );
  return setResponse(200, "Update Production Request Initiated", updated, res);
});

// Request to finish producion
route.put("/:id/requestfinish", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { status: "finish" } }
  );
  return setResponse(200, "Production Finish Request Initiated", updated, res);
});

// Udpate Production Status to approved new
route.put("/:id/approve", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  if (myProduction.status != "new") {
    return setResponse(404, "Production already approved.", null, res);
  }
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { status: "approved new" } }
  );
  return setResponse(200, "Production Status Updated", updated, res);
});

// Udpate Production Status to approved update
route.put("/:id/update", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  if (myProduction.status != "update") {
    return setResponse(404, "Production already approved.", null, res);
  }
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const now = `${month}/${day}/${year}`;
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: {
        status: "approved update",
        rawMaterial: myProduction.updateDataRequest.rawMaterial,
        expense: myProduction.updateDataRequest.expense,
        date: now,
        updateDataRequest: null
      },
    }
  );
  return setResponse(200, "Production Status Updated", updated, res);
});

// Udpate Production Status to not update
route.put("/:id/noupdate", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  if (myProduction.status != "update") {
    return setResponse(404, "Production already approved.", null, res);
  }
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { status: "approved update", updateDataRequest: null } }
  );
  return setResponse(200, "Production Status Updated", updated, res);
});

// Udpate Production Status to approved finish
route.put("/:id/finish", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  if (myProduction.status != "finish") {
    return setResponse(404, "Production already approved.", null, res);
  }
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { status: "approved finish" } }
  );
  return setResponse(200, "Production Status Updated", updated, res);
});

// Udpate Production Status to not finish
route.put("/:id/nofinish", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  if (myProduction.status != "finish") {
    return setResponse(404, "Production already approved.", null, res);
  }
  const updated = await Production.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { status: "approved update" } }
  );
  return setResponse(200, "Production Status Updated", updated, res);
});

route.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const myProduction = await Production.findOne({
    _id: ObjectId(req.params.id),
  });
  if (!myProduction) {
    return setResponse(404, "Production not found", null, res);
  }
  if (myProduction.status != "new") {
    return setResponse(
      404,
      "Production already initiated. Can't delete this production",
      null,
      res
    );
  }
  const deleted = await Production.deleteOne({ _id: ObjectId(req.params.id) });
  return setResponse(200, "Production Deleted", deleted, res);
});

module.exports = route;
