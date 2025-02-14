import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PROJECT_NAME, PROJECT_DESCRIPTION } from '@/constants';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
	title: PROJECT_NAME,
	description: PROJECT_DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' data-theme='light' className='scroll-smooth'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body className='flex flex-col min-h-screen font-sans antialiased'>
				<Navbar />
				<QueryProvider>
					<main className='flex-grow'>{children}</main>
				</QueryProvider>
				<Footer />
			</body>
		</html>
	);
}
