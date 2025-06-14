import dotenv from 'dotenv';
import mongoose from 'mongoose';
import DevNote from '../server/models/DevNote.js';
import matter from 'gray-matter';

dotenv.config();

const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

await mongoose.connect(MONGO_URI, {
  dbName: 'ai-assistant-platform',
});
console.log('✅ Connected to MongoDB');

// Load DevNotes that need repair
const brokenNotes = await DevNote.find({ title: '---' }).lean();

if (!brokenNotes.length) {
  console.log('✅ No broken DevNotes found.');
  process.exit(0);
}

console.log(`🔍 Found ${brokenNotes.length} DevNotes with broken metadata.`);

for (const note of brokenNotes) {
  const parsed = matter(note.content || '');
  const { data } = parsed;

  const update = {};
  if (data.title) update.title = data.title.replace(/^#+\s*/, '');
  if (data.intent) update.intent = data.intent;
  if (data.tags) update.tags = Array.isArray(data.tags) ? data.tags : [data.tags];
  if (data.project) update.project = data.project;

  await DevNote.findByIdAndUpdate(note._id, update);
  console.log(`🛠️  Fixed: ${note._id}`);
}

console.log('✅ Finished updating DevNotes.');
process.exit(0);