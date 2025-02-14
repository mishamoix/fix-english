'use client';

import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { cleanText } from '@/utils';
export default function TextAnalyzer() {
	const [currentText, setCurrentText] = useState('');

	const hasAnyText = cleanText(currentText).length > 0;

	return (
		<div className='p-6 mt-20 border rounded-lg shadow-xl max-md:mt-10 border-slate-100 shadow-slate-200'>
			<textarea
				value={currentText}
				onChange={(e) => setCurrentText(e.target.value)}
				placeholder='Type here'
				className='w-full max-md:min-h-[25vh] min-h-40 text-base-content text-base max-md:text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out'
			/>
			<div className='flex items-center justify-between pt-4'>
				<p className='flex items-center gap-2 text-primary'>
					<CheckCircleIcon className='size-6' />
					No errors found
				</p>
				<button
					className={`btn btn-primary ${!hasAnyText ? 'btn-disabled ' : ''}`}
				>
					Analyze text
				</button>
			</div>
		</div>
	);
}
