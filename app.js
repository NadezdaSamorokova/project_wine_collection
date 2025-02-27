// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
console.log(1);
// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
console.log(2);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "wine_collection";
console.log(3);

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESS_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// 👇 Start handling routes here
//home page route
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);
console.log(4);

//user route
const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

//wine route
const wineRoutes = require("./routes/wine.routes");
app.use("/", wineRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
console.log(5);

module.exports = app;

console.log(6);