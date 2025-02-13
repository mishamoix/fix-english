export const makeFullMistake = (mistake: Mistake) => {
	return `${mistake.error}
- ${mistake.explanation}
- ${mistake.rule}
- ${mistake.example}
	`;
};

export interface Mistake {
	error: string;
	corrected: string;
	explanation: string;
	rule: string;
	example: string;
}

export interface EnhancedStrings {
	linkedin: string;
	email: string;
	whatsapp: string;
}

export interface EnhancedText {
	hasErrors: boolean;
	text: string;
	mistakes?: Mistake[];
	enhanced?: EnhancedStrings;
}
