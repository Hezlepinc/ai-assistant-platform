// scripts/seedDevNotes.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import DevNote from "../server/models/DevNote.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

mongoose.connect(mongoURI);

async function run() {
  try {
    const raw = fs.readFileSync(path.join(__dirname, "../dev_notes/sample.md"), "utf-8");
    const lines = raw.split("---");

    const notes = lines.map((chunk) => ({
      title: chunk.split("\n")[0].trim().slice(0, 60),
      content: chunk.trim(),
      tags: ["seeded"],
      project: "ai-architect-core",
      source: "seed-script",
    }));

    await DevNote.insertMany(notes);
    console.log("✅ Seeded DevNotes:", notes.length);
  } catch (err) {
    console.error("❌ Error seeding DevNotes:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

run();