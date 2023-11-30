import React, { Dispatch, SetStateAction, useState } from 'react';
import RegisterReviewClubSearchPageBodyStyle from './index.style';
import { CalendarIcon } from 'page/calendar/schedule/Body/icon';
import { EmptyStarIcon } from './icon';
import { ClubIcon } from 'page/my/profile/body/icon';
import { DuesIcon, MemberIcon } from 'page/search/club/body/description/icon';

const RatingTag = (props: {
	rating: number | undefined;
	setRating: Dispatch<SetStateAction<number | undefined>>;
}) => {
	const { rating, setRating } = props;

	return (
		<div>
			<div>
				<CalendarIcon width={25} height={25} />
				<span>별점</span>
			</div>
			<div>
				<EmptyStarIcon width={25} height={25} />
				<EmptyStarIcon width={25} height={25} />
				<EmptyStarIcon width={25} height={25} />
				<EmptyStarIcon width={25} height={25} />
				<EmptyStarIcon width={25} height={25} />
			</div>
		</div>
	);
	console.log(rating, setRating);
};

const ActivityTag = (props: {
	activity: number | undefined;
	setActivity: Dispatch<SetStateAction<number | undefined>>;
}) => {
	const { activity, setActivity } = props;

	return (
		<div>
			<div>
				<ClubIcon width={25} height={25} />
				<span>활동</span>
			</div>
			<div>
				<button>활동이 다양해요</button>
				<button>활동이 뜻 깊어요</button>
				<button>교내 활동이 많아요</button>
				<button>교외 활동이 많아요</button>
			</div>
		</div>
	);
	console.log(activity, setActivity);
};

const MemberTag = (props: {
	member: number | undefined;
	setMember: Dispatch<SetStateAction<number | undefined>>;
}) => {
	const { member, setMember } = props;

	return (
		<div>
			<div>
				<MemberIcon width={25} height={25} />
				<span>부원</span>
			</div>
			<div>
				<button>신입생이 많아요</button>
				<button>고학년이 많아요</button>
				<button>왁자지껄 대형 동아리</button>
				<button>오순도순 소형 동아리</button>
			</div>
		</div>
	);
	console.log(member, setMember);
};

const EtcTag = (props: {
	etc: number | undefined;
	setEtc: Dispatch<SetStateAction<number | undefined>>;
}) => {
	const { etc, setEtc } = props;

	return (
		<div>
			<div>
				<DuesIcon width={25} height={25} />
				<span>기타</span>
			</div>
			<div>
				<button>동방이 있어요</button>
				<button>지원금 있어요</button>
				<button>고민중</button>
				<button>고민중</button>
			</div>
		</div>
	);
	console.log(etc, setEtc);
};

const Review = (props: {
	review: string | undefined;
	setReview: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { review, setReview } = props;

	return (
		<div>
			<div>
				<span>리뷰</span>
				<span>{`(${review?.length || 0}/400)`}</span>
			</div>
			<textarea
				value={review}
				placeholder="리뷰를 작성해주세요."
				onChange={event => {
					if (400 < event.target.value.length) {
						alert('최대 400자까지 입력 가능합니다.');
						return;
					}
					setReview(event.target.value);
				}}
			/>
		</div>
	);
};

const RegisterReviewClubSearchPageBody = (props: { clubId: string }) => {
	const { clubId } = props;
	const [rating, setRating] = useState<number | undefined>(undefined);
	const [activity, setActivity] = useState<number | undefined>(undefined);
	const [member, setMember] = useState<number | undefined>(undefined);
	const [etc, setEtc] = useState<number | undefined>(undefined);
	const [review, setReview] = useState<string | undefined>(undefined);

	return (
		<div className={RegisterReviewClubSearchPageBodyStyle}>
			<div>
				<div>
					<RatingTag rating={rating} setRating={setRating} />
					<ActivityTag activity={activity} setActivity={setActivity} />
					<MemberTag member={member} setMember={setMember} />
					<EtcTag etc={etc} setEtc={setEtc} />
				</div>
			</div>
			<Review review={review} setReview={setReview} />
		</div>
	);
	console.log(clubId);
};

export default RegisterReviewClubSearchPageBody;
