import React, { useState } from 'react';
import { AuditRegisterButtonStyle } from './index.style';
import { Modal } from 'component/modal';
import AuditRegister from '../index';

const AuditRegisterButton = () => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	return (
		<>
			<div className={AuditRegisterButtonStyle}>
				<button
					onClick={() => {
						setIsModalOpened(true);
					}}
				>
					<div>
						<span>회계 내역 추가하기</span>
						<span>+</span>
					</div>
				</button>
			</div>
			{isModalOpened ? (
				<Modal setIsModalOpened={setIsModalOpened}>
					<AuditRegister setIsModalOpened={setIsModalOpened} />
				</Modal>
			) : null}
		</>
	);
};

export default AuditRegisterButton;
