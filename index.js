if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const db = require("./db/db");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const helmet = require("helmet");
const jsonParser = express.json();
const loginRouter = require("./middleware/login/login");
const registerRouter = require("./middleware/register/register");
const authRouter = require("./middleware/auth/auth");

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  }),
  jsonParser
);

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/products", authRouter);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log("We are live on http://localhost:" + port);
});

/**
 * error catching middle-ware executed before final
 */
async function errorHandler(err, req, res, next) {
  console.error(err.stack);
  console.log(req.body);
  return res
    .status(500)
    .send("Something broke! Try checking the fields that were sent.");
}
