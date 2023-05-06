const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  restrictions: [String],
  members: { type: Map, of: [String] },
});

const FamilyModel = mongoose.model("Family", FamilySchema);

module.exports = FamilyModel;
