import mongoose from "mongoose";
import dotenv from "dotenv";
import DevNote from "../server/models/DevNote.js";

dotenv.config();

const tagMap = {
  "ai_architect_core": ["orchestration", "core", "routing"],
  "prompt_dsl_framework": ["prompts", "dsl", "structure"],
  "tools_library": ["tools", "actions", "execution"],
  "future_features": ["roadmap", "wishlist", "future"],
  "dev_assistant_build": ["assistant-dev", "devtools", "setup"],
  "deployment_plan": ["deployment", "infra", "prod"],
  "ai_router_strategy": ["routing", "assistants", "sessions"],
  "project_setup": ["setup", "env", "init"],
  "memory_systems": ["memory", "redis", "mongo", "context"],
  "orchestrator_design": ["orchestrator", "control", "pipeline"],
  "feature_backlog": ["roadmap", "features", "tracking"]
};

async function run() {
  const uri = process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  for (const [titleKey, tags] of Object.entries(tagMap)) {
    const result = await DevNote.updateMany(
      { title: new RegExp(titleKey.replace(/_/g, " "), "i") },
      { $set: { tags } }
    );
    console.log(`📄 ${titleKey}: Updated ${result.modifiedCount} documents`);
  }

  await mongoose.disconnect();
  console.log("✅ Done");
}

run().catch(console.error);