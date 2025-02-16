export const GITHUB_URL = 'https://github.com/username/repo';
export const SUPPORT_EMAIL = 'someone@example.com';

export const DEFAULT_LLM = 'chatgpt';
export const OPENAI_MODEL = 'o1-mini';
export const ANTHROPIC_MODEL = 'claude-3-5-sonnet-latest';

export const MAX_CHARACTERS = 600;

const config = {
	sqws: 'deqwdqwedqewd',
	// REQUIRED
	appName: 'FixEnglish',
	// REQUIRED: a short description of your app for SEO tags (can be overwritten)
	appDescription: 'Small tool to improve your english',
	// REQUIRED (no https://, not trialing slash at the end, just the naked domain)
	domainName: '',
	crisp: {
		// Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
		id: '',
		// Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
		onlyShowOnRoutes: ['/'],
	},
	stripe: {
		// Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
		plans: [
			{
				// REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
				priceId: '',
				//  REQUIRED - Name of the plan, displayed on the pricing page
				name: '',
				// A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
				description: '',
				// The price you want to display, the one user will be charged on Stripe.
				price: 0,
				// If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
				priceAnchor: 0,
				features: [],
			},
		],
	},
	auth: {
		// REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
		loginUrl: '',
		// REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
		callbackUrl: '/',
	},
	llm: {
		// Default LLM to use
		default: 'chatgpt',
		// OpenAI model to use
		openaiModel: 'gpt-4o',
		// Anthropic model to use
		anthropicModel: 'claude-3-5-sonnet-latest',
	},
};

export default config;
