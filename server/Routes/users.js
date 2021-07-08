require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");

const { User, validates, validateUser } = require("../Models/user");
const { valid } = require("joi");
const router = express.Router();

router.post("/register", async (req, res) => {
  // checking the inputs using JOI
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // finding the user is already registred or not
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // create a new user to save
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });

  try {
    await user.save();
    res.status(200).send("User Created !!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  console.log("in");
  const { error } = validates(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //   if (req.user) return res.send("User already logged in!");
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) return res.status(400).send("Invalid email or password");
  console.log("out");

  res.send("Success");
});

router.post("/logout", async (req, res) => {});
module.exports = router;
