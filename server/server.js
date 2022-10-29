require("dotenv").config({ path: "./.env.local" });

const path = require("path");
const express = require("express");
const app = express();

//ROUTE for DATABASE

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//ROUTE for FRONTEND
app.use(express.json());

const {
  getAllLists,
  getAllItemsFromList,
  getUserData,
  getAllUsersInList,
  getAllListsOnUser,
} = require("./handler/knex.get");

const {
  addList,
  addUser,
  addItemsToList,
  addUserTolist
} = require("./handler/knex.post")

const {
  deleteUser,
  deleteList,
  deleteItem,
  deleteUserFromList,
} = require("./handler/knex.delete");

//GET METHOD

//app.get tests
app.get("/api", async (req, res) => {
  console.log("Hello World");
  await res.send("Hello World");
});

//user data
app.get("/api/user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  await getUserData(userId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all lists data
app.get("/api/lists", async (req, res) => {
  await getAllLists().then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all items in list
app.get("/api/items/:listId", async (req, res) => {
  const listId = Number(req.params.listId);
  await getAllItemsFromList(listId).then((data) => {
    res.send(data);
  });
});

//all users in list
app.get("/api/users-in-list/:listId", async (req, res) => {
  const listId = Number(req.params.listId);
  await getAllUsersInList(listId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all lists user have (listId)
app.get("/api/lists-on-user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  await getAllListsOnUser(userId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//POST METHOD

app.post("/api/user", async (req, res) => {
  await addUser(req.body);
  res.send(JSON.stringify(req.body));
});

//create list
app.post("/api/lists/add", async (req, res) => {
  console.log(req.body);
  await addList(req.body);
  res.send(JSON.stringify(req.body));
});

//add items to list
app.post("/api/lists/:listId/addItem", async (req, res) => {
  const listId = Number(req.params.listId);
  console.log(listId);
  await addItemsToList(req.body, listId);
  res.send(JSON.stringify(req.body));

});

app.post("/api/lists/:listId/:itemName/toggle", async (req, res) => {
  const listId = Number(req.params.listId);
  const itemName = req.params.itemName;
  await changeState(req.body, listId, itemName)
});

//add user to list
app.post("/api/list:listId/add-user", async (req, res) => {
  await addUserTolist(req.body);
});

//DELETE METHOD


// delete a list
app.delete("/api/lists/:listId/delete", async (req, res) => {
  const listId = Number(req.params.listId);
  await deleteList(listId);
  res.send(JSON.stringify(req.body));
});

//delete an item
app.delete("/api/lists/:listId/:itemName/delete", async (req, res) => {
  const listId = Number(req.params.listId);
  const itemName = req.params.itemName;
  await deleteItemInList(listId, itemName);
  res.send(JSON.stringify(req.body));
});

// app.post("api/access", async (req, res) => {
//   const dbCode = await checkCode(req.body)
//   if (dbCode === req.body.code) {
//     res.send({ granted: true })
//   }
// })

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});
