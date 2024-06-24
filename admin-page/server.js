const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");
const app = express();
const port = 9090;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Frontend origin
  })
);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/spectra_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  delivery_option: Number,
  phone_number: String,
  description: String,
  timing_open: String,
  timing_close: String,
  token: String,
  have_access: { type: Boolean, default: true },
  address: {
    street_address: String,
    apt_number: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
  },
  dishes: [
    {
      dish_name: String,
      dish_image: String,
      dish_price: Number,
      description: String,
      main_ingredient: String,
      dish_category: String,
      food_type: Number,
      res_id: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Define Customer Schema
const customerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  phone_number: String,
  dob: String,
  nickname: String,
  profile_pic: String,
  about: String,
  token: String,
  have_access: { type: Boolean, default: true },
  address: {
    street_address: String,
    apt_number: String,
    city: String,
    state: String,
    country: String,
  },
  favourites: [String],
  delivery_addresses: [String],
});

const Customer = mongoose.model("Customer", customerSchema);

const websiteSetting = new mongoose.Schema({
  minimumValue: { type: Number },
});

const WebsiteSettingModel = mongoose.model("websiteSetting", websiteSetting);

// Routes for Restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/restaurants", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.json(newRestaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/restaurants/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/restaurants/:id", async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/restaurants/:id/access", async (req, res) => {
  try {
    const { have_access } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { have_access },
      { new: true }
    );
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Routes for Customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/customers", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/customers/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/customers/:id/access", async (req, res) => {
  try {
    const { have_access } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { have_access },
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/website-setting", async (req, res) => {
  try {
    const website_setting = await WebsiteSettingModel.findOne();
    res.json(website_setting);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/website-setting", async (req, res) => {
  try {
    const { minimumValue } = req.body;
    const website_setting = await WebsiteSettingModel.findOne();
    if (!website_setting) {
      console.log({ minimumValue, website_setting });
      const website_setting_new = await new WebsiteSettingModel({
        minimumValue,
      }).save();

      res.json(website_setting_new);
      return;
    }
    await WebsiteSettingModel.findByIdAndUpdate(
      website_setting._id.toString(),
      { minimumValue }
    );

    const new_website_setting = await WebsiteSettingModel.findById(
      website_setting._id.toString()
    );

    res.json(new_website_setting);
  } catch (err) {
    console.log({ err });
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
