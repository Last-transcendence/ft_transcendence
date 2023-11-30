import React, { useState } from 'react';
import { PostTitleStyle, RulePostContentStyle, RulePostStyle } from './rulePost.style';
import RuleType from 'common/App.Types';
import { ReactComponent as EditBtnImg } from '../../../assets/RuleEditBtn.svg';

interface RulePostProps {
	rule: RuleType; // 'data' 대신 'rule'로 이름을 변경
}

const TrashcanIcon = (props: {
	width: number | string;
	height: number | string;
	onClick?: () => void;
}) => {
	const { width, height, onClick = undefined } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 20 21"
			fill="none"
			onClick={onClick}
		>
			<path
				d="M2 6.54272H18V19.5427C18 19.8079 17.8946 20.0623 17.7071 20.2498C17.5196 20.4374 17.2652 20.5427 17 20.5427H3C2.73478 20.5427 2.48043 20.4374 2.29289 20.2498C2.10536 20.0623 2 19.8079 2 19.5427V6.54272ZM4 8.54272V18.5427H16V8.54272H4ZM7 10.5427H9V16.5427H7V10.5427ZM11 10.5427H13V16.5427H11V10.5427ZM5 3.54272V1.54272C5 1.27751 5.10536 1.02315 5.29289 0.835618C5.48043 0.648081 5.73478 0.542725 6 0.542725H14C14.2652 0.542725 14.5196 0.648081 14.7071 0.835618C14.8946 1.02315 15 1.27751 15 1.54272V3.54272H20V5.54272H0V3.54272H5ZM7 2.54272V3.54272H13V2.54272H7Z"
				fill="#454545"
			/>
		</svg>
	);
};

const RulePost: React.FC<RulePostProps> = ({ rule }) => {
	const [showBottons, setShowButtons] = useState<boolean>(false);
	const handleEditButtonClick = () => {
		alert('업데이트 예정입니다!');
	};
	const handleDeleteButtonClick = () => {
		alert('업데이트 예정입니다!');
	};

	return (
		<div className={RulePostStyle}>
			<div
				onMouseEnter={() => setShowButtons(true)}
				onMouseLeave={() => setShowButtons(false)}
				className={PostTitleStyle}
			>
				<span>{rule.title}</span>
				{showBottons && (
					<div>
						<EditBtnImg onClick={handleEditButtonClick} />
						<TrashcanIcon width={20} height={21} onClick={handleDeleteButtonClick} />
					</div>
				)}
			</div>
			<div className={RulePostContentStyle}>
				<ul>
					{rule.content.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RulePost;
