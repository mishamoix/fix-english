'use client';

import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { SUPPORT_EMAIL } from '@/config';

const ContactButton: React.FC = () => {
	return (
		<a
			href={`mailto:${SUPPORT_EMAIL}`}
			className='fixed bottom-5 right-4 z-50 btn btn-neutral flex items-center gap-2 shadow-lg max-sm:btn-sm'
		>
			<EnvelopeIcon className='size-6' aria-hidden='true' />
			<span className='max-sm:hidden'>Contact</span>
		</a>
	);
};

export default ContactButton;
