/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
	<div style={{ height: '100%', containerType: 'size' }}>{children}</div>
);
export default Layout;
