'use client';

import HambergurMenu from '@/component/common/hambergur-menu';
import FriendPage from '@/component/friend';
import { useState } from 'react';

const TestPage = () => {
	const [leftIsOpened, setLeftIsOpened] = useState(false);
	const [rightIsOpened, setRightIsOpened] = useState(false);

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
				<span
					onClick={() => {
						setLeftIsOpened(true);
					}}
				>
					왼쪽 방향 햄버거 메뉴 열기
				</span>
				<span
					onClick={() => {
						setRightIsOpened(true);
					}}
				>
					오른쪽 방향 햄버거 메뉴 열기
				</span>
			</div>
			{leftIsOpened && (
				<HambergurMenu title="친구" position="left" setIsOpened={setLeftIsOpened}>
					<FriendPage />
				</HambergurMenu>
			)}
			{rightIsOpened && (
				<HambergurMenu title="test-right" position="right" setIsOpened={setRightIsOpened}>
					<div>
						<span>햄버거 메뉴</span>
					</div>
				</HambergurMenu>
			)}
		</>
	);
};

export default TestPage;
