import { NextRequest, NextResponse } from 'next/server';
import openai from '@/utils/openaiClient';
import { SYSTEM_PROMPT } from './systemPrompt';
export async function POST(req: NextRequest) {
	if (process.env.NODE_ENV === 'development') {
		return NextResponse.json({
			hasError: true,
			text: 'Also have experience working in a small startup.',
			error:
				"1) 'at working' should be just 'working' because 'have experience working' is the correct form.<br>" +
				"2) 'in small startup' should be 'in a small startup' because 'startup' is a countable noun and requires an article 'a'.",
			enchancedText: 'I also have experience working in a small startup.',
			formal: 'I also possess experience working within a small startup.',
			informal: "I've worked in a small startup, too.",
		});
	}

	try {
		const { text } = await req.json();

		if (!text || text.trim() === '') {
			return NextResponse.json({ error: 'Text is required' }, { status: 400 });
		}

		const response = await openai.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{ role: 'system', content: SYSTEM_PROMPT },
				{ role: 'user', content: text.trim() },
			],
			response_format: { type: 'json_object' },
			temperature: 1.0,
		});

		const data = response.choices[0].message.content;
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
