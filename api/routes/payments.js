const route = require("express").Router();
const { Sale, Purchase } = require("../models/model");
const ObjectId = require("mongoose").Types.ObjectId;

function setResponse(status = null, message = null, data = null, resp) {
  const response = {};
  response.status = status;
  response.message = message;
  response.data = data;
  return resp.status(response.status).json(response);
}

route.put("/:invoice/receive", async (req, res) => {
    const data = req.body;
    const mySale = await Sale.findOne({ invoice: req.params.invoice });
    if (!mySale) {
      return setResponse(404, "Invoice not found", null, res);
    }
    if (!data.receivedAmount) {
      return setResponse(405, "Payment amount is required", null, res);
    }
    if (data.receivedAmount > mySale.receivedAmount) {
      return setResponse(405, "Payment amount is invalid", null, res);
    }
    let sum = 0;
    for (let i = 0; i < mySale.product.length; i++) {
      sum =
        sum +
        parseInt(mySale.product[i].unitPrice) *
          parseInt(mySale.product[i].quantity);
    }
    if (mySale.expense.length > 0) {
      for (let i = 0; i < mySale.product.length; i++) {
        sum = sum + parseInt(mySale.expense[i].cost);
      }
    }
    if (mySale.returns.length > 0) {
      for (let i = 0; i < mySale.returns.length; i++) {
        sum = sum - (parseInt(mySale.returns[i].unitPrice) *
        parseInt(mySale.returns[i].quantity));
      }
    }
    if (sum - mySale.receivedAmount < data.receivedAmount) {
      return setResponse(405, "Payment amount is invalid", null, res);
    }
    const updated = await Sale.updateOne(
      { invoice: req.params.invoice },
      {
        $set: {
          receivedAmount:
            parseInt(data.receivedAmount) + parseInt(mySale.receivedAmount),
        },
      }
    );
    return setResponse(200, "Payment Updated", updated, res);
  });

  route.put("/:invoice/pay", async (req, res) => {
    const data = req.body;
    const myPurchase = await Purchase.findOne({ invoice: req.params.invoice });
    if (!myPurchase) {
      return setResponse(404, "Invoice not found", null, res);
    }
    if (!data.paidAmount) {
      return setResponse(405, "Payment amount is required", null, res);
    }
    if (data.paidAmount > myPurchase.paidAmount) {
      return setResponse(405, "Payment amount is invalid", null, res);
    }
    let sum = 0;
    for (let i = 0; i < myPurchase.rawMaterial.length; i++) {
      sum =
        sum +
        parseInt(myPurchase.rawMaterial[i].unitPrice) *
          parseInt(myPurchase.rawMaterial[i].quantity);
    }
    if (myPurchase.expense.length > 0) {
      for (let i = 0; i < myPurchase.rawMaterial.length; i++) {
        sum = sum + parseInt(myPurchase.expense[i].cost);
      }
    }
    if (myPurchase.returns.length > 0) {
      for (let i = 0; i < myPurchase.returns.length; i++) {
        sum = sum - (parseInt(myPurchase.returns[i].unitPrice) *
        parseInt(myPurchase.returns[i].quantity));
      }
    }
    if (sum - myPurchase.paidAmount < data.paidAmount) {
      return setResponse(405, "Payment amount is invalid", null, res);
    }
    const updated = await Purchase.updateOne(
      { invoice: req.params.invoice },
      {
        $set: {
          paidAmount:
            parseInt(data.paidAmount) + parseInt(myPurchase.paidAmount),
        },
      }
    );
    return setResponse(200, "Payment Updated", updated, res);
  });

module.exports = route;
