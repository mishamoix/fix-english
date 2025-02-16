import { Mistake } from '@/app/models';

export const cleanText = (text: string) => {
	return text.trimStart().trimEnd();
};
export const makeFullMistake = (mistake: Mistake) => {
	return `${mistake.error}
- ${mistake.explanation}
- ${mistake.rule}
- ${mistake.example}
	`;
};
