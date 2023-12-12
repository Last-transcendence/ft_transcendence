/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import Header from '@/component/Header';
import { Box } from '@mui/material';
interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
	<div>
		<Header />
		{children}
	</div>
);
export default Layout;
