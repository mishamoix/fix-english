import { NextRequest, NextResponse } from 'next/server';
import anthropic from '@/libs/anthropicClient';
import openai from '@/libs/openaiClient';
import path from 'path';
import fs from 'fs/promises';
import config, { MAX_CHARACTERS } from '@/config';
import { cleanText } from '@/libs';

export async function POST(req: NextRequest) {
	try {
		// if (process.env.NODE_ENV === 'development') {
		// 	return NextResponse.json({
		// 		hasMistakes: true,
		// 		text: 'How is **your**',
		// 		mistakes: [
		// 			{
		// 				error: 'yor',
		// 				corrected: 'your',
		// 				explanation:
		// 					"Spelling error. 'Your' is the correct possessive form of 'you'.",
		// 				rule: "'Your' indicates possession, meaning something that belongs to 'you'.",
		// 				example: 'Is your phone working?',
		// 			},
		// 		],
		// 		enhanced: {
		// 			linkedin: 'How is your recent project progressing?',
		// 			email: 'I hope this email finds you well. How is your current task?',
		// 			whatsapp: "How's ur?",
		// 		},
		// 	});
		// }

		const { text } = await req.json();

		const trimmedText = cleanText(text);

		if (!trimmedText || trimmedText === '') {
			return NextResponse.json({ error: 'Text is required' }, { status: 200 });
		}
		if (trimmedText.length > MAX_CHARACTERS) {
			return NextResponse.json(
				{
					error: `Text exceeds maximum character limit of ${MAX_CHARACTERS}`,
				},
				{ status: 200 }
			);
		}
		const systemPrompt = await getSystemPrompt();
		console.log('Gpt requested');

		let data: string | null = null;
		if (config.llm.default === 'chatgpt') {
			const response = await openai.chat.completions.create({
				model: config.llm.openaiModel,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: trimmedText },
				],
				response_format: { type: 'json_object' },
				temperature: 1.0,
			});
			data = response.choices[0].message.content;
		} else {
			const response = await anthropic.messages.create({
				max_tokens: 1024,
				messages: [
					{ role: 'assistant', content: systemPrompt },
					{ role: 'user', content: trimmedText },
				],
				model: config.llm.anthropicModel,
			});
			if (response.content[0].type === 'text') {
				data = response.content[0].text;
			}
		}
		console.log('GPT done');

		if (!data) {
			return NextResponse.json({ error: 'No data' }, { status: 400 });
		}
		const jsonData = JSON.parse(data);
		console.log('GPT Response', jsonData);
		return NextResponse.json(jsonData);
	} catch (error) {
		return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
	}
}

export function GET() {
	return NextResponse.json(
		{ error: 'GET method not allowed' },
		{ status: 405 }
	);
}

async function getSystemPrompt(filePath?: string): Promise<string> {
	try {
		// Determine the file path (default location if not provided)
		const defaultPath = path.join(process.cwd(), 'prompts', 'command.md');
		const resolvedPath = filePath || defaultPath;

		// Read and return the file content
		return await fs.readFile(resolvedPath, 'utf8');
	} catch (error) {
		console.error('Error reading system prompt:', error);
		throw new Error('Failed to load system prompt');
	}
}
