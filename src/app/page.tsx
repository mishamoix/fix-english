'use client';

import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import TextAnalyzer from '@/components/TextAnalyzer';
import ContactButton from '@/components/ContactButton';

export default function Home() {
	return (
		<>
			<section className='max-w-3xl mx-auto text-center padding'>
				<Hero />
				<TextAnalyzer />
			</section>
			<HowItWorks />
			<Features />
			<ContactButton />
		</>
	);
}
