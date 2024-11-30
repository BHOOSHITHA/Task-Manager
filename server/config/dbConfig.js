require("dotenv").config();
const mongoose = require("mongoose");

// Log the MONGODB_URI to verify it's being read correctly
console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

mongoose.connect("mongodb://127.0.0.1:27017/dev-bugtracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = mongoose;
