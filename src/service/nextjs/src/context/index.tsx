import { ReactNode } from 'react';
import { AuthProvider } from './auth.context';
import { BlockProvider } from './block.context';
import { GameProvider } from './game.context';
import { SocketProvider } from '@/context/socket.context';

const ContextProvider = (prop: { children: ReactNode }) => {
	const { children } = prop;

	return (
		<AuthProvider>
			<SocketProvider>
				<BlockProvider>
					<GameProvider>{children}</GameProvider>
				</BlockProvider>
			</SocketProvider>
		</AuthProvider>
	);
};

export default ContextProvider;
