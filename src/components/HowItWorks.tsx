'use client';
import React from 'react';

export default function HowItWorks() {
	return (
		<section className='text-center padding'>
			<h2 className='mb-4 text-3xl font-bold text-slate-800'>How It Works</h2>
			<p className='max-w-2xl mx-auto mb-6 text-lg text-slate-500'>
				Learn how our tool analyzes your text and provides real-time feedback to
				improve your writing.
			</p>
			<div className='max-w-4xl mx-auto'>
				{/* Responsive video container */}
				<div className='aspect-video'>
					<iframe
						src='https://www.youtube.com/embed/dQw4w9WgXcQ'
						title='How It Works Video'
						allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
						className='w-full h-full rounded-lg shadow-md'
					></iframe>
				</div>
			</div>
		</section>
	);
}
