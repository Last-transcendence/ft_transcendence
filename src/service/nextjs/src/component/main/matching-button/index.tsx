'use client';

import style from '../../../style/main/matching-button/index.module.css';
import MatchingButtonIcon from './icon';
import { useState } from 'react';

interface ModeButtonProps {
	mode: 'EASY' | 'HARD';
}

const ModeButton = ({ mode }: ModeButtonProps) => {
	return <div className={style.modeButtonContainer}>{mode}</div>;
};

const MatchingButton = () => {
	const [isClicked, setIsClicked] = useState<boolean>(false);

	return (
		<div className={style.container}>
			{isClicked ? (
				<>
					<div>
						<ModeButton mode={'EASY'} />
					</div>
					<div>
						<ModeButton mode={'HARD'} />
					</div>
				</>
			) : null}
			<div>
				<MatchingButtonIcon
					width={'75cqw'}
					height={'75cqw'}
					onClick={() => {
						setIsClicked(!isClicked);
					}}
				/>
			</div>
		</div>
	);
};

export default MatchingButton;
