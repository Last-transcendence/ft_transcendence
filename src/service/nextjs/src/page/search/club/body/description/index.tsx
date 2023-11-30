import { Club } from 'context/ClubContext';
import React from 'react';
import SearchClubPageDescriptionStyle from './index.style';
import { MemberIcon, TypeIcon } from './icon';
import { DuesIcon } from 'page/calendar/schedule/Body/icon';
import { BookmarkIcon } from 'page/search/header/icon';
import { MajorIcon } from 'page/my/profile/body/icon';

const Type = (props: { type: string | undefined }) => {
	const { type } = props;

	return (
		<div>
			<div>
				<TypeIcon width={25} height={25} />
				<span>분야</span>
			</div>
			<div>
				<span>{type}</span>
			</div>
		</div>
	);
};

const Member = (props: { member: number | undefined }) => {
	const { member } = props;

	return (
		<div>
			<div>
				<MemberIcon width={28} height={27} />
				<span>인원</span>
			</div>
			<div>
				<span>{member}명</span>
			</div>
		</div>
	);
};

const Dues = (props: { dues: number | undefined }) => {
	const { dues } = props;

	return (
		<div>
			<div>
				<DuesIcon width={37} height={36} />
				<span>회비</span>
			</div>
			<div>
				<span>{dues}원</span>
			</div>
		</div>
	);
};

const Duration = (props: { duration: string | undefined }) => {
	const { duration } = props;

	return (
		<div>
			<div>
				<MemberIcon width={28} height={27} />
				<span>활동 기간</span>
			</div>
			<div>
				<span>{duration}</span>
			</div>
		</div>
	);
};

const Introduction = (props: { introduction: string | undefined }) => {
	const { introduction } = props;

	return (
		<>
			<div>
				<div>
					<span>동아리 소개</span>
				</div>
				<div>
					<span>{introduction}</span>
				</div>
			</div>
			<div>
				<div>
					<span>저장</span>
					<BookmarkIcon
						width={24}
						height={24}
						marked={false}
						onClick={() => {
							alert('업데이트 예정입니다!');
						}}
					/>
				</div>
				<div>
					<span>신청</span>
					<MajorIcon
						width={24}
						height={24}
						onClick={() => {
							alert('업데이트 예정입니다!');
						}}
					/>
				</div>
			</div>
		</>
	);
};

const SearchClubPageDescription = (props: { club: Club }) => {
	const { club } = props;

	return (
		<div className={SearchClubPageDescriptionStyle}>
			<div>
				<Type type={'미술'} />
				<Member member={8} />
				<Dues dues={30000} />
				<Duration duration={'09월 ~ 12월'} />
			</div>
			<div>
				<Introduction introduction={club.introduction} />
			</div>
			<div></div>
		</div>
	);
	console.log(club);
};

export default SearchClubPageDescription;
