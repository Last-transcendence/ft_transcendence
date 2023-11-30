import React from 'react';
import { DeadlineIcon, NotificationIcon, ProgressIcon, ScheduledIcon } from './icon';
import {
	SectionStyle,
	NotificationContainerStyle,
	NotificationHeaderStyle,
	SectionLastStyle,
} from './index.style';

const NotificationCard: React.FC = () => {
	return (
		<div className={NotificationContainerStyle}>
			<div className={NotificationHeaderStyle}>
				<NotificationIcon width={28} height={33} />
				<span>알림</span>
			</div>

			<div className={SectionStyle}>
				<div>
					<DeadlineIcon width={12} height={26} />
					<span>오늘까지 마감</span>
				</div>
				<div>
					{/*schedule DB에서 받아와서 마감인지, 현재 활동중인지, 활동 D-1인지 계산하는 컴포넌트 만들어서 넣기*/}
				</div>
			</div>

			<div className={SectionStyle}>
				<div>
					<ProgressIcon width={12} height={26} />
					<span>현재 활동중</span>
				</div>
				<div>
					{/*schedule DB에서 받아와서 마감인지, 현재 활동중인지, 활동 D-1인지 계산하는 컴포넌트 만들어서 넣기*/}
				</div>
			</div>

			<div className={SectionLastStyle}>
				<div>
					<ScheduledIcon width={12} height={26} />
					<span>활동 D - 1</span>
				</div>
			</div>
		</div>
	);
};

export default NotificationCard;
