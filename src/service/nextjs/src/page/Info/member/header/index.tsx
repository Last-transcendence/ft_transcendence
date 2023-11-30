import React, { Dispatch, SetStateAction, useRef } from 'react';
import { CloseIcon, MemberIcon, OpenIcon } from './icon';
import InfoPageMemberHeaderStyle from './index.style';

const InfoPageMemberHeader = (props: {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { isOpened, setIsOpened } = props;
	const divRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={divRef} className={InfoPageMemberHeaderStyle}>
			<div>
				<MemberIcon width={40} height={24} />
				<span>부원</span>
			</div>
			{isOpened ? (
				<CloseIcon
					width={22}
					height={12}
					onClick={() => {
						if (divRef.current) {
							divRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'end',
								inline: 'nearest',
							});
							divRef.current.style.borderBottom = 'none';
						}
						setIsOpened(false);
					}}
				/>
			) : (
				<OpenIcon
					width={12}
					height={22}
					onClick={() => {
						if (divRef.current) {
							divRef.current.scrollIntoView({
								behavior: 'smooth',
								block: 'start',
								inline: 'nearest',
							});
							divRef.current.style.borderBottom = '1px solid black';
						}
						setIsOpened(true);
					}}
				/>
			)}
		</div>
	);
};

export default InfoPageMemberHeader;
