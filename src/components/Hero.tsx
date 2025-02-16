'use client';

import React from 'react';

export default function Hero() {
	return (
		<div>
			<h1 className='pb-6 lg:text-6xl text-5xl font-extrabold tracking-tighter max-md:pb-3 text-slate-800 max-md:text-3xl'>
				<span>Perfect </span>
				<span className='relative whitespace-nowrap'>
					<span className='text-primary'>Your</span>
				</span>
				<span> English Writing</span>
			</h1>
			<p className='max-w-2xl mx-auto text-2xl text-slate-500 max-md:text-base max-md:px-2 leading-relaxed'>
				Instant, AI-powered analysis to help you write better English. Get
				real-time feedback on grammar, style, and more.
			</p>
		</div>
	);
}
