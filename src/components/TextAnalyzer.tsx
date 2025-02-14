'use client';

import React, { useState } from 'react';
import {
	BeakerIcon,
	BookOpenIcon,
	CheckCircleIcon,
	ExclamationCircleIcon,
	ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { cleanText } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, EnhancedText } from '@/app/models';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function TextAnalyzer() {
	const [currentText, setCurrentText] = useState('');

	const hasAnyText = cleanText(currentText).length > 0;

	const { data, refetch, isFetching } = useQuery<EnhancedText, Error>({
		queryKey: ['enhance'],
		queryFn: async () => {
			const response = await fetch('/api/enhance', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text: currentText }),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const data: ApiResponse = await response.json();

			if ('error' in data) {
				throw new Error(data.error);
			}

			setCurrentText(data.text);

			return data;
		},
		enabled: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
		staleTime: 0,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendRequestIfCan();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendRequestIfCan();
		}
	};

	const sendRequestIfCan = () => {
		if (hasAnyText && !isFetching) {
			refetch().catch((error) => console.error(error));
		}
	};

	// export interface EnhancedStrings {
	// 	linkedin: string;
	// 	email: string;
	// 	whatsapp: string;
	// }

	const enhancedTextArray = data?.enhanced
		? Object.entries(data.enhanced).map(([style, text]) => ({ style, text }))
		: [];

	return (
		<div className='mt-20 space-y-7 max-md:mt-10'>
			<div className='card'>
				<form onSubmit={handleSubmit}>
					<textarea
						name='text'
						value={currentText}
						onChange={(e) => setCurrentText(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Type here'
						className='w-full max-md:min-h-[25vh] min-h-40 text-base-content text-base max-md:text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
					/>
					<div className='flex items-center justify-between pt-4'>
						<p
							className={`flex items-center gap-2 ${
								data?.hasMistakes ? 'text-red-500' : 'text-green-500'
							}`}
						>
							{data && (
								<>
									{data?.hasMistakes ? (
										<XCircleIcon className='size-6' />
									) : (
										<CheckCircleIcon className='size-6' />
									)}
									{data?.hasMistakes ? 'Mistakes found' : 'No mistakes, nice!'}
								</>
							)}
						</p>

						<button
							type='submit'
							className={` btn btn-primary ${
								!hasAnyText || isFetching ? 'btn-disabled' : ''
							}`}
						>
							{isFetching ? (
								<span className='loading loading-dots loading-sm'></span>
							) : (
								'Analyze text'
							)}
						</button>
					</div>
				</form>
			</div>
			{data && data.mistakes && data.mistakes.length > 0 && (
				<div className='space-y-3 card'>
					<p className='flex items-center gap-2 text-lg font-medium text-slate-800'>
						<ExclamationCircleIcon className='size-6 text-error' />
						Grammar Analysis
					</p>
					<div className='flex flex-col gap-2'>
						{data.mistakes.map((mistake, idx) => (
							<div
								key={idx}
								className='p-4 space-y-4 text-left border rounded-md bg-rose-50 border-rose-200'
							>
								<div>
									<p className='flex items-center gap-2 mb-3 text-sm font-medium text-error'>
										<ShieldExclamationIcon className='size-4 ' />
										Grammar Mistake:
									</p>
									<p className='text-base font-medium text-emerald-500'>
										<span className='line-through text-error'>
											{mistake.error}
										</span>
										{' →  '}
										{mistake.corrected}
									</p>
									<p className='text-sm text-slate-500'>{mistake.rule}</p>
								</div>
								<div className='border-b border-rose-200 opacity-85' />
								<div className=''>
									<p className='flex items-center gap-2 mb-3 text-sm font-medium text-blue-600 '>
										<BookOpenIcon className='size-4' />
										Explanation:
									</p>
									<p className='block mb-1 text-sm text-blue-600'>
										{mistake.explanation}
									</p>
									<p className='text-sm text-slate-500'>
										<span className='font-medium text-slate-800'>Example:</span>{' '}
										{mistake.example}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{data && data.enhanced && (
				<div className='space-y-3 card'>
					<p className='flex items-center gap-2 text-lg font-medium text-slate-800'>
						<BeakerIcon className='text-purple-500 size-6' />
						Style Variations
					</p>
					<div className='flex flex-col gap-2 text-left'>
						{enhancedTextArray.map((item, idx) => (
							<div
								key={idx}
								className='p-4 border border-purple-200 rounded-md bg-purple-50'
							>
								<h3 className='font-bold text-purple-800 text-md'>
									{item.style.charAt(0).toUpperCase() + item.style.slice(1)}
								</h3>
								<p className='text-md'>{item.text}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
