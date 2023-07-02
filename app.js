import express from "express";
import bodyParser from "body-parser";

import * as date from "./date.js";

const app = express();
const port = process.env.PORT || 3000;
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (_req, res) => {
  const currentDay = date.getDate();
  const context = {
    listTitle: currentDay,
    newListItems: items,
  };

  res.render("list", context);
});

app.get("/work", (_req, res) => {
  const context = {
    listTitle: "Work List",
    newListItems: workItems,
  };

  res.render("list", context);
});

app.get("/about", (_req, res) => {
  res.render("about");
});

app.post("/", (req, res) => {
  const item = req.body.newItem;

  if (item) {
    if (req.body.list === "Work List") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }

  // console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
