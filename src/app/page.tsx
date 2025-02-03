'use client';

import { useRef, useState } from 'react';
import { EnhancedText } from './models/enhanced.model';

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

	return (
		<div className='p-10 m-auto flex flex-col justify-center items-center gap-4'>
			<div className='flex flex-row max-md:flex-col gap-4 max-md:gap-6 w-full '>
				<textarea
					placeholder='Type here'
					ref={textAreaRef}
					className='textarea w-full min-h-72 text-base-content text-lg'
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							handleTap();
						}
					}}
				/>

				{resultText ? (
					<div
						className={`textarea w-full min-h-28 text-base-content text-2xl opacity-90 border-4 ${
							result
								? result?.hasError
									? 'border-rose-300'
									: 'border-green-300'
								: 'border-white'
						}`}
						dangerouslySetInnerHTML={{
							__html: resultText,
						}}
					/>
				) : (
					<p className='textarea w-full min-h-28 text-base-content text-lg opacity-70'>
						{isLoading && (
							<span className='loading loading-dots loading-sm'></span>
						)}
					</p>
				)}
			</div>
			{result?.error && !isLoading && (
				<p className='text-red-800 text-lg self-start'>{result?.error}</p>
			)}
			<button className='btn btn-primary self-end' onClick={handleTap}>
				Enhance
			</button>

			{result && !isLoading && (
				<div className='flex self-start gap-4 flex-col w-full text-base-content text-lg'>
					{result?.enchancedText && (
						<p className='py-6 px-8 rounded-xl border-2 border-emerald-600 shadow-sm'>
							{result?.enchancedText}
						</p>
					)}
					{result?.formal && (
						<p className='py-6 px-8 rounded-xl shadow-sm border-2 border-blue-600'>
							{result?.formal}
						</p>
					)}
					{result?.informal && (
						<p className='py-6 px-8 rounded-xl shadow-sm border-2 border-orange-600'>
							{result?.informal}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
