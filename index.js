const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
require("dotenv").config();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.get("/", async (req, res) => {
  //appel axios vers le lien
  try {
    const response = await axios.get(
      `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
    );
    //renvoi de la réponse :
    res.json(response.data);
  } catch (error) {
    console.log("Try again");
  }
});

const userRoutes = require("./routes/user.js");
const establishmentRoutes = require("./routes/establishment.js");

app.use(userRoutes);
app.use(establishmentRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// pour passer en ligne:
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

// pour passer en local:
// app.listen(4000, () => {
//   console.log("Server has started !!");
// });
