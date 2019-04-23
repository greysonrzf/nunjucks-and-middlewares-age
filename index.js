const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "njk");

app.get("/", (req, res) => {
  res.render("age");
});

app.post("/check", (req, res) => {
  req.body.age > 18
    ? res.redirect(`/major?age=${req.body.age}`)
    : res.redirect(`/minor?age=${req.body.age}`);
});

const checkAgeOnQuery = (req, res, next) => {
  req.query.age ? next() : res.redirect("/");
};

app.get("/major", checkAgeOnQuery, (req, res) => {
  const { age } = req.query;
  res.render("major", { age });
});

app.get("/minor", checkAgeOnQuery, (req, res) => {
  const { age } = req.query;
  res.render("minor", { age });
});

app.listen(3000, () => console.log("Backend is running..."));
