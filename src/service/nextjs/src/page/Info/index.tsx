import React from 'react';
// import { AuthContext } from 'context/AuthContext';
import InfoPageRule from './rule'; // rule 폴더에서 가져옵니다.
import InfoPageMember from './member'; // member 폴더에서 가져옵니다.
import { InfoPageStyle } from './index.style';

const InfoPage = () => {
	// AuthContext를 사용하여 전역 상태에 접근합니다.
	// const { me } = useContext(AuthContext);

	return (
		<div className={InfoPageStyle}>
			<InfoPageRule />
			<InfoPageMember />
		</div>
	);
};

export default InfoPage;
