'use client';

import React, { useState } from 'react';
import {
	BeakerIcon,
	BookOpenIcon,
	CheckCircleIcon,
	DocumentDuplicateIcon,
	ExclamationCircleIcon,
	ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { cleanText } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, EnhancedText } from '@/app/models';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

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

	const copyText = async (text?: string) => {
		if (text) {
			navigator.clipboard.writeText(text);
			toast.success('Text copied to clipboard', {
				toastId: 'copy-text',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				theme: 'colored',
			});
		}
	};

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
						className='w-full max-md:min-h-[25vh] min-h-40 text-base-content text-base max-md:text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
					/>
					<div className='flex items-center justify-between pt-4'>
						<p className={`flex items-center gap-2 text-slate-800`}>
							{data && (
								<>
									{data?.hasMistakes ? (
										<XCircleIcon className='size-6 text-error' />
									) : (
										<CheckCircleIcon className='text-green-500 size-6' />
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
				{data && data.mistakes && data.mistakes.length > 0 && data.text && (
					<div className='relative pr-20 pl-3 py-2 mt-4 text-left border border-green-200 rounded text-slate-800 bg-green-50/70'>
						<button
							onClick={() => copyText(data.text)}
							className='absolute top-1 right-1 btn btn-ghost btn-sm'
							title='Copy Text'
						>
							<DocumentDuplicateIcon className='size-4 text-slate-800' />
						</button>
						<span
							dangerouslySetInnerHTML={{
								__html: data.text.replace(
									/\*\*(.*?)\*\*/g,
									'<strong>$1</strong>'
								),
							}}
						/>
					</div>
				)}
			</div>
			{data && data.mistakes && data.mistakes.length > 0 && (
				<div className='space-y-3 card'>
					<p className='flex items-center gap-2 text-lg font-medium text-slate-800'>
						<ExclamationCircleIcon className='size-6 text-error' />
						Grammar Analysis
					</p>
					<div className='flex flex-col gap-4'>
						{data.mistakes.map((mistake, idx) => (
							<div
								key={idx}
								className='p-4 space-y-4 text-left border rounded-md shadow-[inset_0px_0px_8px_rgba(244,63,94,0.3)] border-rose-200 hover:shadow-[inset_0px_2px_4px_rgba(0,0,0,0)] transition-shadow duration-300'
							>
								<div>
									<p className='flex items-center gap-2 mb-3 text-sm font-medium text-error'>
										<ShieldExclamationIcon className='size-4 ' />
										Mistake {idx + 1}:
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
					<div className='flex flex-col gap-4 text-left'>
						{enhancedTextArray.map((item, idx) => (
							<div
								key={idx}
								className='px-4 py-2 border border-purple-200 rounded-md relative shadow-[inset_0px_0px_8px_rgba(168,85,247,0.3)] hover:shadow-[inset_0px_2px_4px_rgba(0,0,0,0)] transition-shadow duration-300'
							>
								<button
									onClick={() => copyText(item.text)}
									className='absolute top-1 right-1 btn btn-ghost btn-sm'
									title='Copy Text'
								>
									<DocumentDuplicateIcon className='size-4 text-slate-800' />
								</button>
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
