'use client';
import React from 'react';
import config from '@/config';
import SignInButton from './SignInButton';
import { useSession, signOut } from 'next-auth/react';

const Header: React.FC = () => {
	const { data: session, status } = useSession();

	const handleSignOut = () => {
		signOut();
	};

	const ButtonElement = () => {
		if (status === 'loading') {
			return <div className='loading loading-dots loading-sm text-slate-500' />;
		}

		if (status === 'authenticated' && session) {
			return (
				<div className='flex items-center gap-2'>
					<p className='block text-sm font-bold text-slate-800 max-sm:hidden'>
						Hey, {session.user.name || 'friend'}
					</p>
					<button className='btn btn-link btn-sm' onClick={handleSignOut}>
						Sign Out
					</button>
				</div>
			);
		}

		return <SignInButton />;
	};

	return (
		<div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 bg-white border-b px-14 max-md:px-4 border-slate-200'>
			<a
				href='/'
				className='py-2 text-2xl font-bold tracking-tighter transition-colors text-accent-content hover:text-primary'
			>
				QuickRefine
			</a>
			<ButtonElement />
		</div>
	);
};

export default Header;
