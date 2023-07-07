import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

import * as date from "./date.js";
import { saveItem, displayItem, deleteItem } from "./defaultList.js";
import * as custom from "./customList.js";

const app = express();
const port = process.env.PORT || 3000;
let items = [];
const currentDay = date.getDate();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (_req, res) => {
  items = await displayItem();
  const context = {
    listTitle: currentDay,
    listItems: items,
  };
  res.render("list", context);
});

app.get("/custom/:customName", async (req, res) => {
  const customName = _.capitalize(req.params.customName.trim());
  // console.log(customName);
  const exist = await custom.ifCustomExist(customName);
  if (exist) {
    const foundList = await custom.displayItem(customName);
    const context = {
      listTitle: foundList.name,
      listItems: foundList.items,
    };
    res.render("list", context);
  } else {
    await custom.createList(customName);
    res.redirect("/custom/" + customName);
  }
});

app.post("/", async (req, res) => {
  const newItem = req.body.newItem;
  const listTitle = req.body.listTitle.trim();
  if (listTitle == currentDay) {
    await saveItem(newItem);
    res.redirect("/");
  } else {
    await custom.saveItem(listTitle, newItem);
    res.redirect("/custom/" + listTitle);
  }
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.itemId.trim();
  const listTitle = req.body.listTitle.trim();
  if (listTitle == currentDay) {
    await deleteItem(itemId);
    res.redirect("/");
  } else {
    await custom.deleteItem(listTitle, itemId);
    res.redirect("/custom/" + listTitle);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
