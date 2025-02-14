import React from 'react';
import { CodeBracketIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import {
	PROJECT_NAME,
	PROJECT_DESCRIPTION,
	GITHUB_URL,
	SUPPORT_EMAIL,
} from '@/constants';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='py-4 mt-auto border-t bg-base-200 text-base-content'>
			<div className='container flex flex-col items-center justify-between px-4 mx-auto sm:flex-row'>
				<div>
					<div className='text-lg font-bold text-slate-800'>{PROJECT_NAME}</div>
					<p className='text-sm text-slate-500'>{PROJECT_DESCRIPTION}</p>
				</div>
				<div className='flex items-center gap-2 mt-2 sm:mt-0'>
					<a
						href={GITHUB_URL}
						className='flex items-center gap-1 mr-4 btn btn-sm btn-ghost'
					>
						<CodeBracketIcon className='w-5 h-5' />
						GitHub
					</a>
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='flex items-center gap-1 btn btn-sm btn-ghost'
					>
						<EnvelopeIcon className='w-5 h-5' />
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
