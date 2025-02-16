'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/providers/QueryProvider';

const ClientLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<SessionProvider>
				<QueryProvider>
					{children}

					<Toaster
						toastOptions={{
							duration: 3000,
						}}
					/>
				</QueryProvider>
			</SessionProvider>
		</>
	);
};

export default ClientLayout;
