// server/models/DevNote.js

import mongoose from "mongoose";

const devNoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  project: String,
  source: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const DevNote = mongoose.model("DevNote", devNoteSchema);
export default DevNote;