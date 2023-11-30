import React, { useEffect, useRef, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLoginStyle } from './index.style';
import { ReactComponent as GoogleLogo } from '../../assets/google-logo.svg';
import axios from 'axios';

const styleComponent = (
	width: string,
	height: string,
	divRef: React.RefObject<HTMLDivElement>,
	spanRef: React.RefObject<HTMLSpanElement>,
	setSvgProps: React.Dispatch<React.SetStateAction<React.SVGProps<SVGSVGElement>>>,
) => {
	if (divRef.current) {
		divRef.current.style.width = width;
		divRef.current.style.height = height;
		divRef.current.style.gap = (parseFloat(divRef.current.style.height) * 0.2).toString() + 'px';
		setSvgProps({
			width: parseFloat(divRef.current.style.height).toString() + 'px',
			height: parseFloat(divRef.current.style.height).toString() + 'px',
		});
		if (spanRef.current) {
			spanRef.current.style.fontSize =
				((parseFloat(divRef.current.style.height) * 7) / 20).toString() + 'px';
			spanRef.current.style.lineHeight = divRef.current.style.height;
		}
	}
};

export const GoogleLoginButton = (props: {
	text: string | undefined;
	width: string | undefined;
	height: string | undefined;
	setName: React.Dispatch<React.SetStateAction<string | undefined>>;
	setHd: React.Dispatch<React.SetStateAction<string | undefined>>;
	setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
	const text = props.text || 'Google 계정으로 로그인하기';
	const width = props.width || '100%';
	const height = props.height || '100%';
	const { setName, setHd, setEmail } = props;
	const divRef = useRef<HTMLDivElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const [svgProps, setSvgProps] = useState<React.SVGProps<SVGSVGElement>>({
		width: '100%',
		height: '100%',
	});
	const handleGoogleLogin = useGoogleLogin({
		onSuccess: codeResponse => {
			axios
				.get('https://www.googleapis.com/userinfo/v2/me', {
					headers: {
						Authorization: `Bearer ${codeResponse.access_token}`,
					},
				})
				.then(response => {
					setName(response.data.name);
					setHd(response.data.hd);
					setEmail(response.data.email);
				})
				.catch(error => {
					console.error(error);
					alert(error.response.data.message);
				});
		},
	});

	useEffect(() => {
		styleComponent(width, height, divRef, spanRef, setSvgProps);
	}, []);

	return (
		<div
			className={GoogleLoginStyle}
			onClick={() => {
				handleGoogleLogin();
			}}
			ref={divRef}
		>
			<GoogleLogo width={svgProps.width} height={svgProps.height} />
			<span ref={spanRef}>{text}</span>
		</div>
	);
};
