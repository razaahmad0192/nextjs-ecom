import React from 'react'
import Header from '@/components/Application/Website/Header'
import Footer from '@/components/Application/Website/Footer'
import { Kumbh_Sans } from 'next/font/google'

const kumbh = Kumbh_Sans({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '600', '700','800']
})


const WebsiteLayout = ({ children }) => {
	return(
		<div className={kumbh.className}>
			<Header />
			<main>
				{children}
			</main>
			<Footer />
		</div>
	)
	
}


export default WebsiteLayout
