import React from 'react';
import config from '@/config';

const Navbar: React.FC = () => {
	return (
		<div className='flex items-center justify-between h-16 border-b px-14 max-md:px-4 border-slate-200'>
			<a
				href='/'
				className='py-2 text-2xl font-bold tracking-tighter transition-colors text-accent-content hover:text-primary'
			>
				{config.appName}
			</a>
			<button className='btn btn-primary btn-sm'>Login</button>
		</div>
	);
};

export default Navbar;
