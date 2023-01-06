const route = require("express").Router();
const { Purchase, Production, Sale } = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

// Get all goods
route.get("/", async (req, res) => {
  const goods = [];
  const purchases = await Purchase.find({});
  const prods = await Production.find({ status: "approved finish" });
  const sales = await Sale.find({});
  for (let prod = 0; prod < prods.length; prod++) {
    const good = {
      pid: prods[prod].pid,
      product: prods[prod].product,
      quantity: prods[prod].quantity,
      cost: 0,
    };
    const qtys = [0];
    for (let sale = 0; sale < sales.length; sale++) {
      sales[sale].product.map((i) => {
        if (i.pid == prods[prod].pid) {
          qtys.push(parseInt(i.quantity));
        }
      });
    }
    let total_qty = 0;
    qtys.map((qt) => {
      total_qty += qt;
    });
    const returns = [0];
    for (let sale = 0; sale < sales.length; sale++) {
      sales[sale].returns.map((i) => {
        if (i.pid == prods[prod].pid) {
          returns.push(parseInt(i.quantity));
        }
      });
    }
    let total_returns = 0;
    returns.map((qt) => {
      total_returns += qt;
    });
    good.quantity = good.quantity - total_qty + total_returns;
    let materialCost = 0;
    let expenseCost = 0;
    prods[prod].expense.map((i) => {
      expenseCost += parseInt(i.cost);
    });
    prods[prod].rawMaterial.map((i) => {
      const prices = [];
      purchases.map((j) => {
        j.rawMaterial.map((k) => {
          if (k.material == i.id) {
            prices.push(parseFloat(k.unitPrice));
          }
        });
      });
      let sum = 0.0;
      prices.map((price) => (sum = sum + price));
      sum = sum / prices.length;
      materialCost = materialCost + sum;
    });
    good.cost = materialCost + expenseCost;
    goods.push(good);
  }
  return setResponse(200, null, goods, res);
});

// Get single good
route.get("/:pid", async (req, res) => {
  const goods = [];
  const purchases = await Purchase.find({});
  const prods = await Production.find({ status: "approved finish" });
  const sales = await Sale.find({});
  for (let prod = 0; prod < prods.length; prod++) {
    const good = {
      pid: prods[prod].pid,
      product: prods[prod].product,
      quantity: prods[prod].quantity,
      cost: 0,
    };
    const qtys = [0];
    for (let sale = 0; sale < sales.length; sale++) {
      sales[sale].product.map((i) => {
        if (i.pid == prods[prod].pid) {
          qtys.push(parseInt(i.quantity));
        }
      });
    }
    let total_qty = 0;
    qtys.map((qt) => {
      total_qty += qt;
    });
    const returns = [0];
    for (let sale = 0; sale < sales.length; sale++) {
      sales[sale].returns.map((i) => {
        if (i.pid == prods[prod].pid) {
          returns.push(parseInt(i.quantity));
        }
      });
    }
    let total_returns = 0;
    returns.map((qt) => {
      total_returns += qt;
    });
    good.quantity = good.quantity - total_qty + total_returns;
    let materialCost = 0;
    let expenseCost = 0;
    prods[prod].expense.map((i) => {
      expenseCost += parseInt(i.cost);
    });
    prods[prod].rawMaterial.map((i) => {
      const prices = [];
      purchases.map((j) => {
        j.rawMaterial.map((k) => {
          if (k.material == i.id) {
            prices.push(parseFloat(k.unitPrice));
          }
        });
      });
      let sum = 0.0;
      prices.map((price) => (sum = sum + price));
      sum = sum / prices.length;
      materialCost = materialCost + sum;
    });
    good.cost = materialCost + expenseCost;
    goods.push(good);
  }
  for (let i = 0; i < goods.length; i++) {
    if (goods[i].pid == req.params.pid) {
      found = true;
      return setResponse(200, null, goods[i], res);
    }
  }
  return setResponse(404, "Product id not found", null, res);
});

module.exports = route;
