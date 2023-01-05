const route = require("express").Router();
const { Purchase, RawMaterial, Production } = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

const data = {}
const myInv = {}

// Get all inventory
route.get("/", async (req, res) => {
  const rawMaterial = await RawMaterial.find({});
  const purchases = await Purchase.find({});
  const prods = await Production.find({});
  for (let material = 0; material < rawMaterial.length; material++) {
    data[rawMaterial[material]._id] = [0]
    myInv[rawMaterial[material]._id] = [0]
    for (let purchase = 0; purchase < purchases.length; purchase++) {
      for (let i = 0; i < purchases[purchase]["rawMaterial"].length; i++) {
        if (purchases[purchase]["rawMaterial"][i]["material"] == rawMaterial[material]._id) {
          data[rawMaterial[material]._id].push(parseInt(purchases[purchase]["rawMaterial"][i]["quantity"]));
        }
      }
      for (let i = 0; i < purchases[purchase]["returns"].length; i++) {
        if (purchases[purchase]["returns"][i]["material"] == rawMaterial[material]._id) {
          data[rawMaterial[material]._id].push(0 - parseInt(purchases[purchase]["returns"][i]["quantity"]));
        }
      }
    }
    for (let prod = 0; prod < prods.length; prod++) {
      for (let j = 0; j < prods[prod]["rawMaterial"].length; j++) {
        if (prods[prod]["rawMaterial"][j]["id"] == rawMaterial[material]._id) {
          myInv[rawMaterial[material]._id].push(parseInt(0 - prods[prod]["rawMaterial"][j]["quantity"]));
        }
      }
    }
    let sum = 0;
    for (let i = 0; i < data[rawMaterial[material]._id].length; i++) {
      sum += data[rawMaterial[material]._id][i];
    }
    for (let j = 0; j < myInv[rawMaterial[material]._id].length; j++) {
      sum += myInv[rawMaterial[material]._id][j];
    }
    data[rawMaterial[material]._id] = sum;
  }
  return setResponse(200, null, data, res);
});

// Get single inventory
route.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const rawMaterial = await RawMaterial.find({});
  const purchases = await Purchase.find({});
  const prods = await Production.find({});
  for (let material = 0; material < rawMaterial.length; material++) {
    data[rawMaterial[material]._id] = [0]
    myInv[rawMaterial[material]._id] = [0]
    for (let purchase = 0; purchase < purchases.length; purchase++) {
      for (let i = 0; i < purchases[purchase]["rawMaterial"].length; i++) {
        if (purchases[purchase]["rawMaterial"][i]["material"] == rawMaterial[material]._id) {
          data[rawMaterial[material]._id].push(parseInt(purchases[purchase]["rawMaterial"][i]["quantity"]));
        }
      }
      for (let i = 0; i < purchases[purchase]["returns"].length; i++) {
        if (purchases[purchase]["returns"][i]["material"] == rawMaterial[material]._id) {
          data[rawMaterial[material]._id].push(0 - parseInt(purchases[purchase]["returns"][i]["quantity"]));
        }
      }
    }
    for (let prod = 0; prod < prods.length; prod++) {
      for (let j = 0; j < prods[prod]["rawMaterial"].length; j++) {
        if (prods[prod]["rawMaterial"][j]["id"] == rawMaterial[material]._id) {
          myInv[rawMaterial[material]._id].push(parseInt(0 - prods[prod]["rawMaterial"][j]["quantity"]));
        }
      }
    }
    let sum = 0;
    for (let i = 0; i < data[rawMaterial[material]._id].length; i++) {
      sum += data[rawMaterial[material]._id][i];
    }
    for (let j = 0; j < myInv[rawMaterial[material]._id].length; j++) {
      sum += myInv[rawMaterial[material]._id][j];
    }
    data[rawMaterial[material]._id] = sum;
  }
  const myInventory = data[req.params.id];
  return setResponse(200, null, myInventory, res);
});

module.exports = route;
