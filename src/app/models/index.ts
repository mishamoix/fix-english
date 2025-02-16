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
	text: string;
	mistakes?: Mistake[];
	enhanced?: EnhancedStrings;
}

export interface ApiError {
	error: string;
}

export type ApiResponse = EnhancedText | ApiError;
