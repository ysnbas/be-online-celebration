const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/openai", require("./routes/openaiRoutes"));

//create a json data
const data = {
  name: "John Doe",
  age: 25,
  email: "",
};

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
