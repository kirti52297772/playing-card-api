const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const cardRoutes = require("./routes/cards");
app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
  res.send("Playing Card API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});