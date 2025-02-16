import OpenAI from 'openai';

const llm = new OpenAI({
	apiKey: process.env.LLM_API_KEY,
});

export default llm;
