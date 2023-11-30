import React, { ReactNode } from 'react';
import { TitleContainerStyle } from './TitleContainer.style';

export const TitleContainer = (prop: { titleIcon: ReactNode; title: string; subtitle: string }) => {
	const { titleIcon, title, subtitle } = prop;
	return (
		<div className={TitleContainerStyle}>
			<div>
				{titleIcon}
				<span>{title}</span>
			</div>
			<div>{subtitle}</div>
		</div>
	);
};
