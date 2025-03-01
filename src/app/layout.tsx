import './globals.css';
import Navbar from '@/components/Header';
import Footer from '@/components/Footer';
import { getSEOTags } from '@/libs/seo';
import ClientLayout from '@/components/LayoutClient';
import Script from 'next/script';

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
				<Script
					defer
					strategy='afterInteractive'
					data-domain='quickrefine.com'
					src='https://plausible.bizarrefusion.com/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js'
				/>
				<Script id='plausible-init' strategy='afterInteractive'>
					{`
      window.plausible = window.plausible || function() { 
        (window.plausible.q = window.plausible.q || []).push(arguments) 
      }
    `}
				</Script>
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
