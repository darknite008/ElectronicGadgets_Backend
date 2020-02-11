const express = require("express");
const router = express.Router();

const Products = require("../models/productModel");

router
  .route("/")
  .get((req, res, next) => {
    Products.find({})
      .then(
        products => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(products);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    console.log(req.body);
    Products.create(req.body)
      .then(
        product => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.end("PUT operation cannot be perfromed");
  })
  .delete((req, res, next) => {
    Products.deleteMany({})
      .then(
        reply => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    Products.findById(req.params.id)
      .then(
        product => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "json/application");
          res.json(product);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 404;
    res.end("PUT operation not supported....");
  })
  .put((req, res, next) => {
    Products.findByIdAndUpdate(
      req.params.id,
      { productname: req.body.pname, productprice: req.body.pprice },
      { new: true, useFindAndModefy: false }
    )
      .then(
        product => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Products.findByIdAndDelete(req.params.id)
      .then(
        reply => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reply);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = router;
