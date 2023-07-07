// Import the mongoose object
import mongoose from "./connection.js";

// Define your database schema and model
const itemsSchema = new mongoose.Schema({
  item: String,
});

const Item = mongoose.model("Item", itemsSchema); // collection made here

// Use the mongoose object for database operations
const saveItem = async (newitem) => {
  const item = new Item({ item: newitem });
  try {
    await item.save();
    console.log("Item inserted...🎉🎉🎉");
    // await displayItem();
    // closeConn();
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (itemId) => {
  try {
    await Item.findByIdAndRemove(itemId);
    return;
  } catch (err) {
    console.log(err);
  }
};

const displayItem = async () => {
  try {
    const items = await Item.find();
    // console.log(items);
    return items;
  } catch (err) {
    console.log(err);
  }
};

// const closeConn = async () => {
//   try {
//     await mongoose.disconnect();
//     console.log("Disconnected..:(");
//   } catch (err) {
//     console.log(err);
//   }
// };

// saveItem("Write Poem");
// displayItem();
export { saveItem, displayItem, deleteItem, itemsSchema };
