import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { ToolBarStyle } from './index.style';
import ToolBarTitle from './title';
import ToolBarRouteBtns from './route-btn';
import ClubBtn from './club-btn/';

const ToolBar = () => {
	const { me } = useContext(AuthContext);
	const divRef = useRef<HTMLDivElement | null>(null);
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		if (divRef.current) {
			const wrapper = divRef.current.children[0] as HTMLDivElement;
			const toolBarRouteBtns = wrapper.children[1] as HTMLDivElement;

			if (isClicked) {
				toolBarRouteBtns.style.transition = 'transform 0.8s ease-out';
				toolBarRouteBtns.style.transform = 'translateX(-20%)';
			} else {
				toolBarRouteBtns.style.transition = 'transform 1.0s ease-in-out';
				toolBarRouteBtns.style.transform = 'translateX(0)';
			}
		}
	}, [isClicked]);

	return (
		<div className={ToolBarStyle} ref={divRef}>
			<div>
				<ToolBarTitle me={me} />
				<ToolBarRouteBtns me={me} />
				{me ? <ClubBtn isClicked={isClicked} setIsClicked={setIsClicked} /> : null}
			</div>
		</div>
	);
};

export default ToolBar;
