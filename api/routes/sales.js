const route = require("express").Router();
const {
  Sale,
  Product,
  Account,
  Purchase,
  Production,
} = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

const isAlphabat = (val) => {
  return isNaN(val);
};

const iterateWithFunction = (data, func) => {
  return data.split("").some((i) => {
    return func(i);
  });
};

function getQuantity(data, id) {
  if (data.length === 0) return 0;
  let qty = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].item == id) {
      qty = qty + parseInt(data[i].quantity);
    }
  }
  return qty;
}

function getAvailable(goods, pid) {
  let total = 0;
  goods.map((i) => {
    if (i.pid == pid) {
      total = total + parseInt(i.quantity);
    }
  });
  return total;
}


// Get all sales
route.get("/", async (req, res) => {
  
const goods = [];
const purchases = await Purchase.find({});
  const sales = await Sale.find({});
  const prods = await Production.find({ status: "approved finish" });
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


  const saless = await Sale.find({});
  return setResponse(200, null, saless, res);
});

// Get single sale
route.get("/:id", async (req, res) => {
  
const goods = [];
const purchases = await Purchase.find({});
  const sales = await Sale.find({});
  const prods = await Production.find({ status: "approved finish" });
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


  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  const sale = await Sale.findOne({ _id: ObjectId(req.params.id) });
  if (!sale) {
    return setResponse(404, "Sale record not found", null, res);
  }
  return setResponse(200, null, sale, res);
});

// Add new sale
route.post("/", async (req, res) => {
  
const goods = [];
const purchases = await Purchase.find({});
  const sales = await Sale.find({});
  const prods = await Production.find({ status: "approved finish" });
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


  const data = req.body;
  if (!data.customer) {
    return setResponse(405, "Customer is required", null, res);
  }
  const customerExist = await Account.findOne({
    _id: ObjectId(data.customer),
    accountType: "customer",
  });
  if (!customerExist) {
    return setResponse(405, "Account type not allowed", null, res);
  }
  if (!data.receivedAmount) {
    return setResponse(405, "Received Amount is required", null, res);
  }
  if (iterateWithFunction(data.receivedAmount, isAlphabat)) {
    return setResponse(
      405,
      "Amount can not contain alphabat or symbol",
      null,
      res
    );
  }
  if (!data.product) {
    return setResponse(405, "Product is required", null, res);
  }
  if (data.product.length === 0) {
    return setResponse(405, "Product is required", null, res);
  }

  for (let i = 0; i < data.product.length; i++) {
    if (!data.product[i].item) {
      return setResponse(405, "Product is required", null, res);
    }
    const myProduct = await Product.findOne({
      _id: ObjectId(data.product[i].item),
    });
    if (!myProduct) {
      return setResponse(404, "Product not found", null, res);
    }
    if (!data.product[i].quantity) {
      return setResponse(405, "Product quantity is required", null, res);
    }
    if (!data.product[i].pid) {
      return setResponse(405, "Production ID is required", null, res);
    }
    if (parseInt(data.product[i].quantity) < 1) {
      return setResponse(405, "Invalid Quantity", null, res);
    }
    if (!data.product[i].unitPrice) {
      return setResponse(405, "Unit Price is required", null, res);
    }
    if (parseFloat(data.product[i].unitPrice) < 0.1) {
      return setResponse(405, "Invalid unit price", null, res);
    }
  }
  for (let i = 0; i < data.product.length; i++) {
    const available = getAvailable(goods, data.product[i].pid);
    if (data.product[i].quantity > available) {
      return setResponse(405, "Not enough stock available", null, res);
    }
  }
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const now = `${month}/${day}/${year}`;
  data.date = now;
  const count = await Sale.find({});
  data.invoice = count.length + 1;
  const newSale = new Sale(data);
  newSale.save();
  return setResponse(201, "Sale Added", newSale, res);
});

// Return item
route.put("/:id", async (req, res) => {
  const goods = [];
  const purchases = await Purchase.find({});
    const sales = await Sale.find({});
    const prods = await Production.find({ status: "approved finish" });
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
  
  
  const data = req.body;
  if (!ObjectId.isValid(req.params.id)) {
    return setResponse(405, "Invalid ID", null, res);
  }
  if (!data.product || data.product.length === 0) {
    return setResponse(405, "Nothing to return", null, res);
  }
  const mySale = await Sale.findOne({ _id: ObjectId(req.params.id) });
  if (
    data.product.some((i) => {
      if (!i.quantity) {
        return true;
      }
      if (!i.item) {
        return true;
      }
      if (!i.pid) {
        return true;
      }
      if (parseInt(i.quantity) < 1) {
        return true;
      }
      if (
        parseInt(getQuantity(mySale.returns, i.item)) + parseInt(i.quantity) >
        parseInt(getQuantity(mySale.product, i.item))
      ) {
        return true;
      }
    })
  ) {
    return setResponse(405, "Invalid Return", null, res);
  }
  const updatedData = [...mySale.returns, ...data.product];
  const update = await Sale.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { returns: updatedData } }
  );
  return setResponse(200, "Return Successful", update, res);
});

module.exports = route;
