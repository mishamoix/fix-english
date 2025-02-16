import './globals.css';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { getSEOTags } from '@/libs/seo';
import ClientLayout from '@/components/LayoutClient';

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
				<ClientLayout>
					<Navbar />
				</ClientLayout>

				<main className='flex-grow'>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
