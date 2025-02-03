'use client';

import { useRef, useState } from 'react';
import { EnhancedText } from './models/enhanced.model';
import TextVariant from '@/components/TextVariant';

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<EnhancedText | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleTap = async () => {
		if (isLoading) return;
		setIsLoading(true);
		setError(null);
		const response = await fetch('/api/enhance', {
			method: 'POST',
			body: JSON.stringify({ text: textAreaRef.current?.value }),
		});

		try {
			const data = await response.json();
			const status = response.status;

			if (status === 400) {
				setError(data.error);
				return;
			}
			setResult(data);
		} catch (error) {
			setError('Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const resultText = (() => {
		if (isLoading) return null;
		if (error) return error;
		if (result) return result.text;
		return 'Nothing yet here...';
	})();

	const handleCopy = () => {
		if (result) {
			const cleanText = result.text.replace(/<\/?[^>]+(>|$)/g, '');
			navigator.clipboard.writeText(cleanText);
		}
	};
	return (
		<div className='p-10 max-md:p-4 m-auto flex flex-col justify-center items-center gap-4'>
			<div className='flex flex-row max-md:flex-col gap-4 max-md:gap-3 w-full '>
				<textarea
					placeholder='Type here'
					ref={textAreaRef}
					className='textarea w-full max-md:min-h-[25vh] min-h-72 text-base-content text-lg max-md:text-sm'
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							handleTap();
						}
					}}
				/>

				{resultText ? (
					<div
						className={`flex flex-row align-top relative textarea w-full max-md:min-h-[25vh] min-h-72 text-base-content text-lg max-md:text-base opacity-90 border-4 ${
							result
								? result?.hasError
									? 'border-rose-300'
									: 'border-green-500'
								: 'border-white'
						}`}
					>
						<div
							className='flex-1'
							dangerouslySetInnerHTML={{
								__html: resultText,
							}}
						/>
						{result && (
							<button className='btn btn-ghost btn-sm' onClick={handleCopy}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
									/>
								</svg>
							</button>
						)}
					</div>
				) : (
					<p className='textarea w-full max-md:min-h-[25vh] min-h-72 text-base-content text-lg opacity-70 max-md:text-base'>
						{isLoading && (
							<span className='loading loading-dots loading-sm'></span>
						)}
					</p>
				)}
			</div>
			<button
				className={`btn btn-primary self-end ${isLoading && 'btn-disabled'}`}
				onClick={handleTap}
			>
				{isLoading ? 'Enhancing' : 'Enhance'}
				{isLoading && <span className='loading loading-dots loading-sm'></span>}
			</button>
			{result?.error && !isLoading && (
				<div className=' text-red-900 text-lg max-md:text-sm self-start flex flex-col gap-4 mt-10 max-md:mt-4'>
					{result?.error.map((error, index) => (
						<div className='flex flex-row gap-2' key={index}>
							<span>{index + 1}.</span>
							<span className='whitespace-pre-line'>{error}</span>
						</div>
					))}
				</div>
			)}

			{result && !isLoading && (
				<div className='flex self-start gap-4 flex-col w-full text-base-content text-lg mt-10 max-md:mt-4 max-md:text-sm'>
					{result?.enchancedText && (
						<TextVariant type='best' text={result?.enchancedText} />
					)}
					{result?.formal && (
						<TextVariant type='formal' text={result?.formal} />
					)}
					{result?.informal && (
						<TextVariant type='informal' text={result?.informal} />
					)}
				</div>
			)}
		</div>
	);
}
