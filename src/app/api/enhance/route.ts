import { NextRequest, NextResponse } from 'next/server';
import anthropic from '@/libs/anthropicClient';
import openai from '@/libs/openaiClient';
import path from 'path';
import fs from 'fs/promises';
import config, { MAX_CHARACTERS } from '@/config';
import { cleanText } from '@/libs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/next-auth';
import User from '@/app/models/User';
import connectMongo from '@/libs/mongoose';

const getUser = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return null;
	}

	await connectMongo();

	const result = await User.findById(session.user.id);
	return result;
};

export async function POST(req: NextRequest) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json(
				{ error: 'Unauthorized, please login' },
				{ status: 401 }
			);
		}

		if (user.hasAccess) {
			return NextResponse.json(
				{ error: 'You have been blocked, please contact support' },
				{ status: 403 }
			);
		}

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

		user.numberOfRequests++;
		await user.save();

		const systemPrompt = await getSystemPrompt();
		console.log('Gpt requested with text:', trimmedText);

		let data: string | null = null;
		if (config.llm.default === 'chatgpt') {
			const response = await openai.chat.completions.create({
				model: config.llm.openaiModel,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: "User's input: " + trimmedText },
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
					{ role: 'user', content: "User's input: " + trimmedText },
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
