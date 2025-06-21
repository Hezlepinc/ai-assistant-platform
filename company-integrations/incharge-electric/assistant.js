// company-integrations/incharge-electric/assistant.js
import { getClaudeResponse } from '../../server/logic/gptClaude.js';
import { getGptResponse } from '../../server/logic/gptChat.js';
import pricebook from './pricebook.json' with { type: 'json' };

const STARTING_PRICE = pricebook[0]?.price || "$9,975";
const CTA_URL = "https://inchargegenerators.com/contact/";

export default async function inchargeAssistant({ message, context }) {
  const prompt = `
You are the Incharge Electric Generator Assistant.

Your tone should be:
- Short and clear
- Friendly, casual, and customer-facing
- Helpful but never overly technical or robotic

Don't over-explain. Give just enough information to help the customer feel confident.
If asked about pricing, casually mention that most homeowners start with our "Home Standby Essentials" package — it's around ${STARTING_PRICE} and includes everything needed (generator, install, propane hookup, etc.).

Always invite them to reach out through the contact form when it makes sense: ${CTA_URL}

User: ${message}
Context: ${JSON.stringify(context)}
`;

  try {
    return await getClaudeResponse(message, prompt, 'claude-3-opus-20240229');
  } catch (error) {
    console.warn('⚠️ Claude failed, using GPT fallback:', error.message);
    return await getGptResponse(message, context.sessionId || null);
  }
}