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
		<div className='bg-base-300 p-10 m-auto flex flex-col justify-center items-center gap-4'>
			<textarea
				placeholder='Type here'
				ref={textAreaRef}
				className='textarea w-full min-h-28 text-base-content text-lg'
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						handleTap();
					}
				}}
			/>

			<>
				{resultText ? (
					<div
						className={`textarea w-full min-h-28 text-base-content text-2xl opacity-90 ${
							result && (result?.hasError ? 'bg-red-100' : 'bg-green-100')
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
				{result?.error && !isLoading && (
					<p className='text-red-800 text-lg self-start'>{result?.error}</p>
				)}
			</>
			<button className='btn btn-primary self-end' onClick={handleTap}>
				Enhance
			</button>

			{result && !isLoading && (
				<div className='flex self-start gap-4 flex-col w-full text-base-content text-lg'>
					<p className='bg-green-100 py-6 px-8 rounded-xl'>
						{result?.enchancedText}
					</p>
					<p className='bg-blue-100 py-6 px-8 rounded-xl'>{result?.formal}</p>
					<p className='bg-orange-100 py-6 px-8 rounded-xl'>
						{result?.informal}
					</p>
				</div>
			)}
		</div>
	);
}
