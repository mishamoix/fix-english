'use client';

import { useRef, useState } from 'react';
import { EnhancedText, makeFullMistake } from './models/enhanced.model';
import TextVariant from '@/components/TextVariant';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import TextAnalyzer from '@/components/TextAnalyzer';

export default function Home() {
	return (
		<>
			<section className='max-w-3xl mx-auto text-center padding'>
				<Hero />
				<TextAnalyzer />
			</section>
			<HowItWorks />
			<Features />
		</>
	);
}
