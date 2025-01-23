import { NextRequest, NextResponse } from 'next/server';
import openai from '@/utils/openaiClient';
import { SYSTEM_PROMPT } from './systemPromps';
export async function POST(req: NextRequest) {
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
