const arr = [
  {
    _id: { $oid: "64a5b45e61d1d4f68aa2ced3" },
    item: "Write Essay",
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a5b45e61d1d4f68aa2" },
    item: "Write Poem",
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "64a5b45e61d1d4f68aa2ce3" },
    item: "Write Essay2",
    __v: { $numberInt: "0" },
  },
];

arr.forEach((items) => {
  console.log(items.item);
});
