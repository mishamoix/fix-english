// {
// "hasError": true | false - whether there were global improvements
// "text": just the text
// "error": optionally what rules were violated
// "enchancedText": just improved text by a native speaker
// "formal": formal text
// "informal": informal text
// }

export interface EnhancedText {
	hasError: boolean;
	text: string;
	error?: string;
	enchancedText?: string;
	formal?: string;
	informal?: string;
}
