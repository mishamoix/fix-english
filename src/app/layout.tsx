import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
	title: 'Fix english',
	description: 'Small tool to improve your english',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' data-theme='light' className='scroll-smooth'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body className={`bg-slate-100 font-sans antialiased h-screen`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
