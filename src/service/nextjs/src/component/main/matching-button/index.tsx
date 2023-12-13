import style from '../../../style/main/matching-button/index.module.css';
import MatchingButtonIcon from './icon';

const MatchingButton = () => {
	return (
		<div className={style.container}>
			<MatchingButtonIcon width={'75%'} height={'75%'} />
		</div>
	);
};

export default MatchingButton;
