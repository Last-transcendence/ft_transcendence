import React from 'react';
import RegisterReviewClubSearchPageStyle from './index.style';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { BackwardIcon } from '../../icon';
import { EditIcon } from 'page/my/profile/header/icon';
import RegisterReviewClubSearchPageBody from './body';

const Header = (props: { clubId: string; navigate: NavigateFunction }) => {
	const { clubId, navigate } = props;
	const handleClick = () => {
		navigate(`/main/search/${clubId}`);
	};

	return (
		<div>
			<div>
				<BackwardIcon width={28} height={28} onClick={handleClick} />
				<span>리뷰 작성</span>
			</div>
			<div
				onClick={() => {
					alert('업데이트 예정입니다!');
				}}
			>
				<span>등록</span>
				<EditIcon width={24} height={24} />
			</div>
		</div>
	);
};

const RegisterReviewClubSearchPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const clubId = location.pathname.split('/')[3];

	return (
		<div className={RegisterReviewClubSearchPageStyle}>
			<Header clubId={clubId} navigate={navigate} />
			<RegisterReviewClubSearchPageBody clubId={clubId} />
		</div>
	);
};

export default RegisterReviewClubSearchPage;
