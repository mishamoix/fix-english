import { NextRequest, NextResponse } from 'next/server';
import anthropic from '@/utils/anthropicClient';
import openai from '@/utils/openaiClient';
import path from 'path';
import fs from 'fs/promises';

const LLM = 'chatgpt';

const ANTHROPIC_MODEL = 'claude-3-5-sonnet-latest';
const OPENAI_MODEL = 'gpt-4o';

export async function POST(req: NextRequest) {
	try {
		const { text } = await req.json();

		const trimmedText = text.trimStart().trimEnd();

		if (!trimmedText || trimmedText === '') {
			return NextResponse.json({ error: 'Text is required' }, { status: 400 });
		}
		const systemPrompt = await getSystemPrompt();
		console.log('Gpt requested');

		let data: string | null = null;
		if (LLM == 'chatgpt') {
			const response = await openai.chat.completions.create({
				model: OPENAI_MODEL,
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
				model: ANTHROPIC_MODEL,
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
