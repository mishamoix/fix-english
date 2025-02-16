import React from 'react';
import { CodeBracketIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import config, { GITHUB_URL } from '@/config';
import { SUPPORT_EMAIL } from '@/config';
const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='py-4 mt-auto border-t bg-base-200 text-base-content px-14 max-md:px-4'>
			<div className='flex flex-col items-center justify-between px-4 mx-auto sm:flex-row max-sm:text-center gap-4'>
				<div>
					<div className='text-lg font-bold text-slate-800'>
						{config.appName}
					</div>
					<p className='text-sm text-slate-500'>{config.appDescription}</p>
				</div>
				<div className='flex items-center gap-2 mt-2 sm:mt-0 max-md:flex-col max-md:gap-1 max-sm:flex-row'>
					<a
						href={GITHUB_URL}
						className='flex items-center gap-1 btn btn-sm btn-ghost'
					>
						<CodeBracketIcon className='size-5' />
						GitHub
					</a>
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='flex items-center gap-1 btn btn-sm btn-ghost'
					>
						<EnvelopeIcon className='size-5' />
						Email
					</a>
				</div>
				<div className='mt-2 text-sm sm:mt-0'>
					© {currentYear} - All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
