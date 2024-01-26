import CreatOrModifyBody from '@/component/common/creatOrModifyBody/CreatOrModifyBody';
import { BottomButton } from '@/component/common/ButtomButton';
import { Header } from '@/component/common/Header';
import { Stack } from '@mui/material';
import { useState } from 'react';

const CreatUserBody = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [sendServer, setSendServer] = useState<boolean>(false);

	return (
		<Stack justifyContent={'space-between'} height="100%">
			<Header title="프로필 수정" />
			<CreatOrModifyBody
				isModify={true}
				setLoading={setLoading}
				execSendServer={sendServer}
				setExecSendServer={setSendServer}
			/>
			<BottomButton
				title="수정완료"
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
