import type { Metadata } from 'next';
import config from '@/config';

export const getSEOTags = ({
	title,
	description,
	keywords,
	openGraph,
	canonicalUrlRelative,
	extraTags,
}: Metadata & {
	canonicalUrlRelative?: string;
	extraTags?: Record<string, any>;
} = {}) => {
	const defaultImageUrl = `https://${config.domainName}/og-image.png`; // Add your default image URL here

	return {
		title: title || config.appName,
		description: description || config.appDescription,
		keywords: keywords || [config.appName],
		applicationName: config.appName,
		openGraph: {
			title: openGraph?.title || config.appName,
			description: openGraph?.description || config.appDescription,
			url: openGraph?.url || `https://${config.domainName}/`,
			siteName: openGraph?.title || config.appName,
			locale: 'en_US',
			type: 'website',
			images: [
				{
					url: defaultImageUrl,
					alt: openGraph?.title || config.appName,
				},
			],
		},
		twitter: {
			title: openGraph?.title || config.appName,
			description: openGraph?.description || config.appDescription,
			card: 'summary_large_image',
			creator: '',
			images: [defaultImageUrl],
		},
		...(canonicalUrlRelative && {
			alternates: { canonical: canonicalUrlRelative },
		}),
		...extraTags,
	};
};
