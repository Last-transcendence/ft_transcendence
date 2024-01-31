import Block from '@/type/block.type';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import AuthContext from './auth.context';
import { getFetcher } from '@/service/api';

const BlockContext = createContext<{
	block: Block[] | null;
	setBlock: Dispatch<SetStateAction<Block[] | null>>;
}>({
	block: null,
	setBlock: () => {},
});

export const BlockProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [block, setBlock] = useState<Block[] | null>(null);
	const { me } = useContext(AuthContext);

	useEffect(() => {
		if (!block && me) {
			getFetcher<Block[]>('/block')
				.then(response => {
					setBlock(response);
				})
				.catch(error => {
					setBlock(null);
				});
		}
	}, [block, me]);

	return <BlockContext.Provider value={{ block, setBlock }}>{children}</BlockContext.Provider>;
};

export default BlockContext;
