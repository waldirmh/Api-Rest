const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const axios = require("axios");

// INITIALIZATIONS
const app = express();

// MIDDLEWARE
app.use(express.static("public"));

// SETTINGS
app.set("views", path.join(__dirname, "views")); // me llama la ruta views
app.use(express.static(path.join(__dirname, "public"))); //  public folder
console.log("ruta", path.join(__dirname, "views"));

app.engine("ejs", engine); // es el motor de plantillas
app.set("view engine", "ejs"); // sirve para validar los views del fronted
app.set("port", process.env.PORT || 4000);

// ROUTES
app.get("/", (req, res, next) => {
  res.render("home");
  // res.send("hola mundo ")
});

// STARTING THE SERVER
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
