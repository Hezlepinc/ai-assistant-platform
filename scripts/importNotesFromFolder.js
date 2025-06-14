// scripts/importNotesFromFolder.js
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import DevNote from "../server/models/DevNote.js";

// Load environment
dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const MONGO_URI = isProd ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const NOTES_DIR = path.resolve("dev_notes");

async function run() {
  const files = fs.readdirSync(NOTES_DIR);

  const notes = [];

  for (const file of files) {
    const ext = path.extname(file);
    if (![".md", ".txt"].includes(ext)) continue;

    const content = fs.readFileSync(path.join(NOTES_DIR, file), "utf-8").trim();
    const lines = content.split("\n");
    const title = lines[0].slice(0, 100);

    notes.push({
      title,
      content,
      tags: [path.basename(file, ext)],
      source: "bulk-import",
      project: "ai-architect-core"
    });
  }

  if (notes.length) {
    await DevNote.insertMany(notes);
    console.log(`✅ Imported ${notes.length} DevNotes from ${NOTES_DIR}`);
  } else {
    console.log("⚠️ No valid .md or .txt files found.");
  }

  process.exit();
}

run();