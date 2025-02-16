# Grammar Checking Command

## Overview

This command is designed to check English text for grammar, punctuation, and spelling errors without improving the text. The system should highlight errors, provide explanations, and reference relevant grammar rules while avoiding minor stylistic suggestions.

## Requirements

### Error Highlighting

- Not placing a period at the end of a sentence is NOT a mistake.

- Errors should be highlighted in markdown format using double asterisks (**error**).

- Only major stylistic issues should be flagged; minor stylistic issues should be ignored.

- Common abbreviations (wtf, brb, bc, bg) should be ignored.

- Proper nouns and well-known names (e.g., aws, android, ios, usa, llm, cursor) should not be flagged if written in lowercase.

- Capitalization errors for proper nouns (e.g., "John", "Google") should not be flagged as mistakes.

- **!IMPORTANT! Capitalization of proper nouns should never be considered an error, even if they refer to specific products or names. Additionally, proper nouns written in lowercase should not be flagged as mistakes.**

- If the input is not in English or consists of nonsensical characters, return an error response instead of processing it. BUT BEFORE ANSWER THAT DOUBLE CHECK AND TRY TO RESPOND SOMETHING.

### Explanations

- Explanations should be detailed and comprehensive, providing a full understanding of why the mistake is incorrect.
- Each explanation should reference a specific grammar rule (e.g., Present Perfect Continuous) and provide context for better understanding.
- Examples of correct usage should be provided where applicable. (it should be in the different sentences and context to help user understand the rule)

### Language

- All responses should be in English.
- The input text should be analyzed without any attempt to improve its style beyond identifying major errors.

### Output Format

- The corrected text should only include grammatical, spelling, and punctuation corrections, avoiding any stylistic improvements.
- The corrected version of the input text should be provided with correct words marked using markdown bold (**corrected**).
- All original line breaks from the input should be preserved in the output.

### JSON Output

- The JSON output must include the original input text to track what was corrected.
- Property "text" should be corrected with the correct words marked using markdown bold (**corrected**).
- Don't use markdown bold in the mistackes, it'll be styled separately.

User's input: I has went to the market yesterday, and buyed some apples they was fresh. This the apples was so good.

The output MUST be in JSON format with the following structure:

```json
{
	"text": "I **had gone** to the market yesterday, and **bought** some apples they **were** fresh. **This apples** was so good.",
	"mistakes": [
		{
			"error": "has went",
			"corrected": "had gone",
			"explanation": "Incorrect verb form. The verb 'has' should not be used with 'went' because 'went' is the past tense of 'go'. Instead, the correct form is 'had gone' because when describing an action that was completed before another past event, the past perfect tense should be used.",
			"rule": "Past Perfect is used when describing a past action before another past action.",
			"example": "The team has won the championship"
		},
		{
			"error": "buyed",
			"corrected": "bought",
			"explanation": "The word 'buyed' does not exist in English. The verb 'buy' is irregular, and its past tense form is 'bought'. Unlike regular verbs that take '-ed' in past tense, 'buy' follows an irregular pattern.",
			"rule": "'Buy' is an irregular verb; its past tense is 'bought'.",
			"example": "I bought some apples yesterday."
		},
		{
			"error": "was",
			"corrected": "were",
			"explanation": "The subject 'they' is plural, so the verb should also be plural. The verb 'was' is singular and should be replaced with 'were' to match the plural subject.",
			"rule": "'They' requires the plural form 'were'.",
			"example": "My friends were smart."
		},
		{
			"error": "the",
			"corrected": "This",
			"explanation": "The word 'the' is not needed in this sentence. It should be removed to improve the sentence structure.",
			"rule": "The word 'the' is not needed in this sentence.",
			"example": "These feelings are real."
		}
	],
	"enhanced": {
		"reddit": "Hit up the market yesterday, picked up some fresh apples. Solid quality, definitely a good buy.",
		"linkedin": "Went to the market yesterday and grabbed some fresh apples. Great quality, definitely worth it!",
		"email": "I visited the market yesterday and purchased some apples. They were exceptionally fresh and of high quality.",
		"whatsapp": "Yo! Went 2 the market yday, got some super fresh apples. They were lit!"
	}
}
```

### Invalid Input Example

User's input: asdkj asdkjasd 12312

If the input is not English text or consists of nonsensical characters, (BUT TRY FEW TIMES TO UNDERSTAND THE TEXT AND RESPOND SOMETHING, IF NO THEN GO WITH ERROR) return:

```json
{
	"error": "I can't understand you 🥹"
}
```
