import Fuse from 'fuse.js';
import DevNoteManager from './DevNoteManager.js';

const devNoteManager = new DevNoteManager();

// Define fuzzy tag database
const fuzzyTagMap = [
  { tag: 'system_tiers', keywords: ['three tiers', '3 tiers', 'core layer', 'company integrations'] },
  { tag: 'memory_systems', keywords: ['redis', 'memory', 'mongodb', 'short-term', 'long-term'] },
  { tag: 'prompt_dsl_framework', keywords: ['dsl', 'prompt rules', 'config language'] },
  { tag: 'orchestrator_design', keywords: ['orchestrator', 'routing', 'dispatcher', 'router'] },
  { tag: 'future_features', keywords: ['future features', 'upcoming features', 'roadmap'] },
  // Add more mappings...
];

// Flatten into searchable array
const fuse = new Fuse(
  fuzzyTagMap.flatMap(({ tag, keywords }) => keywords.map(k => ({ tag, keyword: k }))),
  { keys: ['keyword'], threshold: 0.4 }
);

function getFuzzyMatchedTags(message) {
  const results = fuse.search(message);
  const uniqueTags = [...new Set(results.map(r => r.item.tag))];
  return uniqueTags;
}

export default class ContextInjector {
  async buildPromptContext({ message, intent = 'general' }) {
    const tags = getFuzzyMatchedTags(message);
    let notes = [];

    if (tags.length > 0) {
      notes = await devNoteManager.fetchNotesByTags(tags);
    }

    if (notes.length === 0) {
      notes = await devNoteManager.fetchNotesByIntent(intent);
    }

    if (notes.length > 0) {
      const contextText = notes
        .map(n => `• ${n.title?.replace(/^#+\s*/, '')}\n${n.content}`)
        .join('\n\n');

      return `Use the following DevNotes to inform your response:\n\n${contextText}`;
    }

    return 'You are assisting with the AI Assistant Platform project.';
  }
}