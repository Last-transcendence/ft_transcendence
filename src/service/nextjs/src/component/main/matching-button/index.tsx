'use client';

import style from '../../../style/main/matching-button/index.module.css';
import MatchingButtonIcon from './icon';

const MatchingButton = () => {
	return (
		<div className={style.container}>
			<div>
				<MatchingButtonIcon
					width={'75cqw'}
					height={'75cqw'}
					onClick={() => {
						alert('matching button clicked');
					}}
				/>
			</div>
		</div>
	);
};

export default MatchingButton;
