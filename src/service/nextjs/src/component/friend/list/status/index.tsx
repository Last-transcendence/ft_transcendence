'use client';

import React, { useEffect, useRef } from 'react';
import style from '../../../../style/friend/list/status/index.module.css';

interface StatusProps {
	status: '온라인' | '오프라인' | '게임 중';
}

const FriendStatus = ({ status }: StatusProps) => {
	const spanRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (spanRef.current) {
			spanRef.current.style.color =
				status === '온라인' ? '#1CB119' : status === '오프라인' ? '#495D49' : '#9C27B0';
		}
	}, [status]);

	return (
		<div className={style.container}>
			<span ref={spanRef}>{status}</span>
		</div>
	);
};

export default FriendStatus;
