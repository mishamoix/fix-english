import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.LLM_API_KEY,
});

export default openai;
