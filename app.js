import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
var items = ["Buy Food", "Cook Food", "Eat Food"];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const currentDay = date.toLocaleDateString("en-US", options);

  var context = {
    day: currentDay,
    newListItems: items,
  };

  res.render("list", context);
});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  items.push(item);

  // Redirects to / route 
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
