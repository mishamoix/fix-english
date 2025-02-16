import Anthropic from '@anthropic-ai/sdk';

const llm = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export default llm;
