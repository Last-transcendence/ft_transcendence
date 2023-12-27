import { ReactNode } from 'react';
import { AuthProvider } from './auth.context';
import { BlockProvider } from './block.context';
import { GameProvider } from './game.context';

const ContextProvider = (prop: { children: ReactNode }) => {
	const { children } = prop;

	return (
		<AuthProvider>
			<BlockProvider>
				<GameProvider>{children}</GameProvider>
			</BlockProvider>
		</AuthProvider>
	);
};

export default ContextProvider;
