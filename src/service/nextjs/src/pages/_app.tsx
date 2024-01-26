import type { AppProps } from 'next/app';
import '@/style/globals.css';
import { Global, css } from '@emotion/react';
import Layout from '@/component/common/Layout';
import ContextProvider from '@/context';
import { theme } from '@/style/theme';
import { ThemeProvider } from '@mui/material/styles';
import LogoutOnUnload from '@/component/common/monitorLogout';

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
		height: max(100vh, 640px);
		width: max(56.25vh, 360px);
	}
`;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Global styles={globalStyles} />
			<ThemeProvider theme={theme}>
				<Layout>
					<ContextProvider>
						<LogoutOnUnload />
						<Component {...pageProps} />
					</ContextProvider>
				</Layout>
			</ThemeProvider>
		</>
	);
}
