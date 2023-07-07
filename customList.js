import mongoose from "./connection.js";
import { itemsSchema } from "./defaultList.js";

const customSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const Custom = mongoose.model("Custom", customSchema);

const ifCustomExist = async (customName) => {
  try {
    const exist = await Custom.findOne({ name: customName });
    if (exist) {
      console.log(`${customName} list exists`);
      return true;
    } else {
      console.log(`${customName} list doesnot exists`);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const createList = async (customName) => {
  try {
    const customList = new Custom({
      _id: new mongoose.Types.ObjectId(),
      name: customName,
      items: [],
    });
    await customList.save();
    console.log(`Created New list named ${customName}`);
    // mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

const saveItem = async (customName, newItem) => {
  try {
    const foundList = await Custom.findOne({ name: customName });
    const newItemList = {
      _id: new mongoose.Types.ObjectId(),
      item: newItem,
    };
    foundList.items.push(newItemList);
    await foundList.save();
    console.log(`Added Item to ${customName} list`);
    // mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

const displayItem = async (customName) => {
  try {
    const foundList = await Custom.findOne({ name: customName });
    return foundList;
    // console.log(foundList.name + "  " + foundList.items);
    // mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (customName, itemId) => {
  try {
    await Custom.findOneAndUpdate(
      { name: customName },
      { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } }
    );
    console.log(`Deleted item from ${customName} list..`);
    // mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

export { ifCustomExist, createList, saveItem, displayItem, deleteItem };
// ifCustomExist("Work");
// deleteItem("Work", "64a706e510d53077f6338aa5");
// displayItem("Work");
// saveItem("Work", "Write Poem");
// createList("home");
