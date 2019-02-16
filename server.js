const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const path = require("path");
const Chatkit = require("@pusher/chatkit-server");

const app = express();
const PORT = process.env.PORT || 5000;

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:ce026d83-5843-4303-9d2c-33e38e01319e",
  key:
    "35876f17-4c03-4fa5-ac67-be682e8367ca:0f4iZB4vCEytQwpPaQCmpXmYGtj2HtUDM6fn2gW7wC8="
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

app.post("/users", (req, res) => {
  console.log("In /users route");

  const { userName } = req.body;

  chatkit
    .createUser({
      id: userName,
      name: userName
    })
    .then(() => res.status(201).send({ status: "Success" }))
    .catch(error => {
      console.error("Error creating user: ", error.error);
      res.status(error.status).send({
        error: error.error,
        error_description: error.error_description
      });
    });
});

app.post("/authenticate", (req, res) => {
  console.log("In /authenticate route with user:", req.query.user_id);

  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
