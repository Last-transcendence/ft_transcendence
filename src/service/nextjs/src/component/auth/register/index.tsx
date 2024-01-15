import CreatOrModifyBody from '@/component/common/creatOrModifyBody/creatOrModifyBody';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { Stack, Box } from '@mui/material';
import { useState } from 'react';

const CreatUserBody = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const [sendServer, setSendServer] = useState<boolean>(false);

	return (
		<Stack justifyContent={'space-between'} height="100%">
			<Header title="회원 가입" />
			<CreatOrModifyBody
				isModify={false}
				setLoading={setLoading}
				execSendServer={sendServer}
				setExecSendServer={setSendServer}
			/>
			<BottomButton
				title="완료"
				onClick={
					loading
						? undefined
						: () => {
								setLoading(true);
								setSendServer(true);
							}
				}
			/>
		</Stack>
	);
};

export default CreatUserBody;
