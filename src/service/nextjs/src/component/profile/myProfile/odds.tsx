import Game from '@/type/game.type';

const Odds = ({ gameRecords, message }: { gameRecords: Game[]; message: string }) => {
	const calcOdd = () => {
		let count = 0;
		if (message.length === 0) {
			gameRecords.map(item => {
				if (item.result === 1) {
					count++;
				}
			});
			return `${gameRecords.length === 0 ? 0 : (count / gameRecords.length) * 100}%`;
		} else {
			return '로딩 실패';
		}
	};
	return <p>전적 : {calcOdd()}</p>;
};

export default Odds;
