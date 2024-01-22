import { ReactNode } from 'react';
import { AuthProvider } from './auth.context';
import { BlockProvider } from './block.context';
import { GameProvider } from './game.context';
import { SocketProvider } from '@/context/socket.context';
import { ListenProvider } from '@/context/listen.context';

const ContextProvider = (prop: { children: ReactNode }) => {
	const { children } = prop;

	return (
		<AuthProvider>
			<SocketProvider>
				<ListenProvider>
					<BlockProvider>
						<GameProvider>{children}</GameProvider>
					</BlockProvider>
				</ListenProvider>
			</SocketProvider>
		</AuthProvider>
	);
};

export default ContextProvider;
