import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true, // Ensures that every document includes a 'link'
  },
  reference: {
    type: String,
    required: true, // Ensures that every document includes a 'reference'
    unique: true, // Ensures that each 'reference' is unique in the collection
  },
});

// The third parameter in mongoose.model is the name of the collection in MongoDB.
// If your MongoDB collection name is 'references', then this is correct.
// If your collection has a different name, replace 'references' with the actual name.
const LinkModel =
  mongoose.models.Link || mongoose.model("Link", LinkSchema, "references");

export default LinkModel;
