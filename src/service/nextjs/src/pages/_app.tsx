import type { AppProps } from 'next/app';
import '@/style/globals.css';
import { Global, css } from '@emotion/react';
import Layout from '@/component/Layout';

const globalStyles = css`
	body {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		background-color: gray;
	}

	#__next {
		margin: 0 auto;
		background-color: #ffffff;
		height: 100vh;
		width: 480px;
	}
`;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Global styles={globalStyles} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
