import { NextRequest, NextResponse } from 'next/server';
import openai from '@/utils/openaiClient';
import { SYSTEM_PROMPT } from './systemPrompt';
export async function POST(req: NextRequest) {
	// if (process.env.NODE_ENV === 'development') {
	// 	await new Promise((resolve) => setTimeout(resolve, 500));
	// 	return NextResponse.json({
	// 		hasError: true,
	// 		text: 'Also have <b>experience working</b> in a small startup. Also have <b>experience working</b> in a small startup. Also have <b>experience working</b> in a small startup. Also have <b>experience working</b> in a small startup.',
	// 		error: [
	// 			"'At' is a preposition that typically refers to a location or specific point (e.g., 'I work at Google'). When describing experience, we use 'working in' (or 'working with/for') to emphasize the activity or environment you were part of. 'Experience at' is grammatically possible, but it would require a noun (not a verb). For example:\n" +
	// 				"• ✅ 'I have experience at a small startup.' (Here, 'startup' is a noun.)\n" +
	// 				"• ❌ 'I have experience at working in a startup.' (Mixing 'at' with a verb is awkward.)",
	// 			'Another rullleeeesszzz',
	// 		],
	// 		enchancedText:
	// 			'I also have experience working in a small startup. I also have experience working in a small startup. I also have experience working in a small startup.',
	// 		formal: 'I possess experience working in a small startup.',
	// 		informal: "I've worked in a small startup.",
	// 	});
	// }

	try {
		const { text } = await req.json();

		const trimmedText = text.trimStart().trimEnd();

		if (!trimmedText || trimmedText === '') {
			return NextResponse.json({ error: 'Text is required' }, { status: 400 });
		}

		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: SYSTEM_PROMPT },
				{ role: 'user', content: trimmedText },
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
