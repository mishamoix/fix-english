'use client';

import React from 'react';

export default function Hero() {
	return (
		<div className='mx-auto mt-20'>
			<h1 className='pb-6 text-5xl font-extrabold tracking-tighter lg:text-6xl max-md:pb-3 text-slate-800 max-sm:text-3xl max-md:text-4xl'>
				<span>Your </span>
				<span className='text-primary'>AI </span>
				<span>English </span>
				<span className='text-primary'>Proofreader</span>
			</h1>
			<p className='max-w-2xl mx-auto text-xl leading-relaxed text-slate-500 max-md:text-base max-md:px-2'>
				Instant AI analysis corrects grammar and punctuation, refines your
				style, and explains every change to help you write better English.
			</p>
		</div>
	);
}
