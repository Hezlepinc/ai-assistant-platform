const fs = require("fs");
const path = require("path");

async function loadAssistant(assistantPath) {
  if (!fs.existsSync(assistantPath)) {
    throw new Error(`Assistant not found at: ${assistantPath}`);
  }

  const assistant = require(assistantPath);
  if (!assistant.respond) throw new Error("Assistant must export a 'respond' method");
  return assistant;
}

module.exports = loadAssistant;