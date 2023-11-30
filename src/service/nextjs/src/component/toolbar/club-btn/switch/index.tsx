import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ClubBtnModalBtnStyle, ClubBtnModalStyle } from './index.style';
import { User } from 'context/AuthContext';
import { Club } from 'context/ClubContext';
import { Types } from 'mongoose';
import axios from 'axios';
import LogoutButton from './logout';

const switchClub = (
	clubId: Types.ObjectId | undefined,
	setClub: Dispatch<SetStateAction<Club | null>>,
) => {
	if (clubId) {
		axios
			.get(`${process.env.REACT_APP_NESTJS_URL}/club/${clubId}`, { withCredentials: true })
			.then(response => {
				setClub(response.data);
			})
			.catch(err => {
				console.log(err);
			});
	}
};

const ClubBtnModalBtn = (props: { clubId: Types.ObjectId | undefined; onClick: () => void }) => {
	const { clubId, onClick } = props;
	const [club, setClub] = useState<Club | null>(null);

	useEffect(() => {
		if (clubId) {
			axios
				.get(`${process.env.REACT_APP_NESTJS_URL}/club/${clubId}`, { withCredentials: true })
				.then(response => {
					setClub(response.data);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [clubId]);

	return (
		<div className={ClubBtnModalBtnStyle} onClick={onClick}>
			<div>
				<span>{club?.name}</span>
			</div>
			<div>
				<div></div>
			</div>
		</div>
	);
};

const ClubBtnModal = (props: {
	me: User | null;
	club: Club | null;
	setClub: Dispatch<SetStateAction<Club | null>>;
	isClicked: boolean;
	setIsClicked: Dispatch<SetStateAction<boolean>>;
}) => {
	const { me, club, setClub, isClicked, setIsClicked } = props;

	return (
		<div className={ClubBtnModalStyle}>
			<ClubBtnModalBtn
				clubId={club?._id}
				onClick={() => {
					setIsClicked(false);
				}}
			/>
			{me?.clubs?.map((curClubId, index) => {
				if (club?._id === curClubId) {
					return null;
				}
				return (
					<ClubBtnModalBtn
						key={index}
						clubId={curClubId}
						onClick={() => {
							setIsClicked(false);
							switchClub(curClubId, setClub);
						}}
					/>
				);
			})}
			<div>
				<div>
					<span>동아리 추가 +</span>
				</div>
				<LogoutButton setIsClicked={setIsClicked} />
			</div>
		</div>
	);
	console.log(me, club, setClub, isClicked, setIsClicked);
};

export default ClubBtnModal;
