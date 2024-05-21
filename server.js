const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const client = require("./db/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  req.db = client.db(process.env.DB_NAME);
  next();
});

app.use(cors());

app.use("/openai", require("./routes/openaiRoutes"));
app.use("/accounts", require("./routes/accountsRoutes"));
app.use("/generated", require("./routes/generatedRoutes"));
app.use("/prompt", require("./routes/promptRoutes"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
