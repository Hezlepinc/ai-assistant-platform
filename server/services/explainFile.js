// server/services/explainFile.js

import { getFileContent } from '../ai-architect-core/utils/fileHelper.js';
import { getGptResponse } from '../logic/gptChat.js';

export async function explainFile(filePath) {
  const fileContent = await getFileContent(filePath);
  const prompt = `Please explain this file in clear terms:\n\n${fileContent}`;
  const explanation = await getGptResponse(prompt);
  return explanation;
}