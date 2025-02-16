'use client';

import { signIn } from 'next-auth/react';

export default function GoogleLogin() {
	return (
		<button className='btn btn-primary' onClick={() => signIn('google')}>
			Sign in with Google
		</button>
	);
}
