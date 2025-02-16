import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import config from '@/config';
import { QueryProvider } from '@/providers/QueryProvider';
import { Bounce, ToastContainer } from 'react-toastify';
import { getSEOTags } from '@/libs/seo';

export const metadata = getSEOTags();

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
				<ToastContainer
					position='bottom-center'
					autoClose={1000}
					stacked={false}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick={true}
					rtl={false}
					pauseOnFocusLoss
					theme='light'
					transition={Bounce}
				/>
				<Footer />
			</body>
		</html>
	);
}
