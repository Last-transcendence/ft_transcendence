import React from 'react';
import InfoPageRuleTitle from './title';
import InfoPageRuleContent from './content';
import { InfoPageRuleStyle } from './index.style';

const InfoPageRule = () => {
	return (
		<div className={InfoPageRuleStyle}>
			<InfoPageRuleTitle />
			<InfoPageRuleContent />
		</div>
	);
};

export default InfoPageRule;
