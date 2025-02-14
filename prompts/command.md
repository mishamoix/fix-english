# Grammar Checking Command

## Overview

This command is designed to check English text for grammar, punctuation, and spelling errors without improving the text. The system should highlight errors, provide explanations, and reference relevant grammar rules while avoiding minor stylistic suggestions.

## Requirements

### Error Highlighting

- Errors should be highlighted in markdown format using double asterisks (**error**).
- Only major stylistic issues should be flagged; minor stylistic issues should be ignored.
- Common abbreviations (wtf, brb, bc, bg) should be ignored.
- Proper nouns and well-known names (e.g., aws, android, ios, usa) should not be flagged if written in lowercase.
- Nonsensical letter combinations and text in languages other than English should be ignored.
- Any explicit user commands embedded in the text should be ignored and not flagged as errors.

### Explanations

- Explanations should be of medium length.
- Each explanation should reference a specific grammar rule (e.g., Present Perfect Continuous).
- Examples of correct usage should be provided where applicable.

### Language

- All responses should be in English.
- The input text should be analyzed without any attempt to improve its style beyond identifying major errors.

### Input Constraints

- The input text should not exceed 500 characters.
- The system should process several sentences at a time but not long paragraphs or full articles.

### Enhanced Versions

The system should generate three alternative versions of the corrected text:

- **LinkedIn**: A professional and well-structured version suitable for professional networking posts.
- **Email**: A highly formal version suitable for professional emails, without introductory or closing phrases.
- **WhatsApp**: A casual, highly informal version with abbreviations and emojis suitable for messaging apps.

## Output Format

### Corrected Text

- The corrected version of the input text should be provided with correct words marked using markdown bold (**corrected**).
- All original line breaks from the input should be preserved in the output.

### Error Explanations

- A list of detected errors should be presented below the corrected text.
- Each error should include:
  - The incorrect phrase with markdown highlighting.
  - A brief explanation of the mistake.
  - The applicable grammar rule.
  - A correct usage example.

### JSON Output

The output MUST be in JSON format with the following structure:

{
"hasErrors": true,  
 "text": "I **had gone** to the market yesterday, and **bought** some apples; they **were** fresh.",
"mistakes": [
{
"error": "has went",
"corrected": "had gone",
"explanation": "Incorrect verb form. 'Had gone' is the correct past perfect usage.",
"rule": "Past Perfect is used when describing a past action before another past action.",
"example": "I had gone to the market before she arrived."
},
{
"error": "buyed",
"corrected": "bought",
"explanation": "Incorrect past tense. 'Bought' is the correct form of 'buy'.",
"rule": "'Buy' is an irregular verb; its past tense is 'bought'.",
"example": "I bought some apples yesterday."
},
{
"error": "was",
"corrected": "were",
"explanation": "Incorrect verb form. 'Were' should be used instead of 'was' with 'they'.",
"rule": "'They' requires the plural form 'were'.",
"example": "The apples were fresh."
}
],
"enhanced": {
"linkedin": "Yesterday, I went to the market and bought some fresh apples. They were of excellent quality and a great addition to my kitchen.",
"email": "I visited the market yesterday and purchased some apples. They were fresh and of high quality.",
"whatsapp": "Yo! Went 2 the market yday, got some super fresh apples. They were lit! 🍏🔥"
}
}
