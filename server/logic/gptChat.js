import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getGptResponse(userMessage, context = '') {
  try {
    console.log('🔑 Using OpenAI Key:', process.env.OPENAI_API_KEY?.slice(0, 8)); // ✅ Confirm API key

    const messages = [
      { role: 'system', content: context || 'You are a helpful assistant for the AI Assistant Platform.' },
      { role: 'user', content: userMessage },
    ];

    console.log('🧠 Sending to GPT:', messages); // ✅ Log request

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-4' if 4o is not available
      messages,
    });

    const reply = completion.choices[0].message.content;
    console.log('✅ GPT response:', reply); // ✅ Log reply

    return reply;
  } catch (err) {
    console.error('❌ GPT Error:', err.response?.data || err.message || err); // ✅ Log full error
    return '⚠️ GPT encountered an error.';
  }
}