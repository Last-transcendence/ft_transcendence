import Block from '@/type/block.type';
import axios from 'axios';
import {
	Dispatch,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';

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

	useEffect(() => {
		if (!block) {
			axios
				.get(`${process.env.NEXT_PUBLIC_API_URL}/block`, { withCredentials: true })
				.then(response => {
					setBlock(response.data);
				})
				.catch(error => {
					setBlock(null);
					console.error(error);
				});
		}
	}, [block]);

	return <BlockContext.Provider value={{ block, setBlock }}>{children}</BlockContext.Provider>;
};

export default BlockContext;
