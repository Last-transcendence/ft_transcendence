/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { Header } from './Header';
import { Box } from '@mui/material';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
	<div style={{ height: '100%', containerType: 'size' }}>
		{/*<Header />*/}
		{children}
	</div>
);
export default Layout;
