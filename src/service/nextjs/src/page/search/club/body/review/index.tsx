import { Types } from 'mongoose';
import React, { useEffect, useState } from 'react';
import SearchClubPageReviewStyle from './index.style';
import axios from 'axios';
import { DownArrowIcon } from 'page/Audit/body/icon';
import { EditIcon } from 'page/my/profile/header/icon';
import { useNavigate } from 'react-router-dom';

type Review = {
	_id: Types.ObjectId;
	clubId: Types.ObjectId;
	userId: Types.ObjectId;
	rating: number;
	content: string;
	likes: number;
};

const Header = (props: { reviews: Review[] | null }) => {
	const { reviews } = props;
	const reviewCount = reviews ? reviews.length : 0;
	const averageRating =
		reviews && 0 < reviewCount
			? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviewCount
			: 0;
	const starCount = 5;
	const fullStarCount = Math.floor(averageRating);
	const emptyStarCount = starCount - fullStarCount;
	const fullStar = '★'.repeat(fullStarCount);
	const emptyStar = '☆'.repeat(emptyStarCount);

	return (
		<div>
			<div>
				<span>동아리 리뷰</span>
			</div>
			<div>
				<span>{averageRating.toFixed(1)}</span>
				<span>
					{fullStar}
					{emptyStar}
				</span>
				<span>(+{reviewCount})</span>
			</div>
		</div>
	);
};

const Review = (props: { review: Review }) => {
	const { review } = props;
	const fullStarCount = Math.floor(review.rating);
	const emptyStarCount = 5 - fullStarCount;
	const fullStar = '★'.repeat(fullStarCount);
	const emptyStar = '☆'.repeat(emptyStarCount);

	return (
		<div>
			<div></div>
			<div>
				<span>
					{fullStar}
					{emptyStar}
				</span>
				<span>{review.content}</span>
			</div>
			<div></div>
		</div>
	);
};

const Reviews = (props: { clubId: Types.ObjectId; reviews: Review[] | null }) => {
	const { clubId, reviews } = props;
	const navigate = useNavigate();

	return (
		<div>
			<div>
				<div>
					<span>최신순</span>
					<DownArrowIcon
						width={20}
						height={10}
						onClick={() => {
							alert('업데이트 예정입니다!');
						}}
					/>
				</div>
				<div
					onClick={() => {
						navigate(`/main/search/${clubId}/review/register`);
					}}
				>
					<span>작성</span>
					<EditIcon width={18} height={18} />
				</div>
			</div>
			<div>
				<div>
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
					{reviews?.map((review, index) => (
						<Review key={index} review={review} />
					))}
				</div>
			</div>
		</div>
	);
};

const SearchClubPageReview = (props: { clubId: Types.ObjectId }) => {
	const { clubId } = props;
	const [reviews, setReviews] = useState<Review[] | null>(null);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_NESTJS_URL}/club/${clubId}/review`)
			.then(response => {
				setReviews(response.data);
			})
			.catch(() => {
				setReviews(null);
			});
	}, []);

	return (
		<div className={SearchClubPageReviewStyle}>
			<Header reviews={reviews} />
			<Reviews clubId={clubId} reviews={reviews} />
		</div>
	);
};

export default SearchClubPageReview;
