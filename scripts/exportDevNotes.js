import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import DevNote from '../server/models/DevNote.js';

dotenv.config();

const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

const devNotesDir = path.resolve('./dev_notes');

await mongoose.connect(MONGO_URI);
console.log('✅ Connected to MongoDB');

const notes = await DevNote.find({});

if (!fs.existsSync(devNotesDir)) fs.mkdirSync(devNotesDir);

notes.forEach((note) => {
  const filename = `${note.title.toLowerCase().replace(/\s+/g, '_')}.md`;
  const filePath = path.join(devNotesDir, filename);
  const frontmatter = `---\ntitle: "${note.title}"\ntags: [${note.tags.join(', ')}]\nproject: "${note.project}"\nsource: "${note.source}"\ntimestamp: "${note.timestamp.toISOString()}"\n---\n\n`;

  fs.writeFileSync(filePath, frontmatter + note.content);
});

console.log(`✅ Exported ${notes.length} DevNotes to ${devNotesDir}`);
process.exit();