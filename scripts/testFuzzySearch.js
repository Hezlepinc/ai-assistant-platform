import DevNoteManager from '../server/ai-architect-core/managers/DevNoteManager.js';

const run = async () => {
  const manager = new DevNoteManager();
  const results = await manager.searchNotesBySimilarity('3 tiers of the ai assistant platform');

  console.log('🔍 Fuzzy Results:');
  console.log(results);
};

run();